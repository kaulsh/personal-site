import { useState, useRef, useEffect } from "react";

const css = `
  .skill-accordion {
    font-family: var(--font-sans, 'Inter', sans-serif);
    border: 1px solid #2a2d3e;
    border-radius: 10px;
    overflow: hidden;
    background: #181b2a;
    margin: 24px 0;
  }

  .skill-accordion-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: #1f2235;
    gap: 8px;
  }

  .skill-accordion-bar-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .skill-accordion-bar-left svg {
    width: 13px;
    height: 13px;
    color: #4a4f6a;
    flex-shrink: 0;
  }

  .skill-accordion-label {
    font-size: 11px;
    font-weight: 600;
    color: #4a4f6a;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .skill-accordion-filename {
    font-size: 12px;
    font-weight: 500;
    color: #9ba3c2;
    font-family: 'SF Mono', 'Fira Mono', 'Cascadia Code', monospace;
  }

  .skill-accordion-bar-right {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .skill-accordion-btn {
    background: none;
    border: none;
    color: #4a4f6a;
    padding: 4px 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 500;
    font-family: var(--font-sans, 'Inter', sans-serif);
    letter-spacing: 0.02em;
    transition: color 0.15s, background 0.15s;
  }

  .skill-accordion-btn:hover {
    color: #9ba3c2;
    background: #252842;
  }

  .skill-accordion-btn svg {
    width: 12px;
    height: 12px;
  }

  .skill-accordion-btn.expanded svg.chevron {
    transform: rotate(180deg);
  }

  .skill-accordion-btn svg.chevron {
    transition: transform 0.2s;
  }

  .skill-accordion-body {
    position: relative;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .skill-accordion-code {
    margin: 0;
    padding: 12px 14px;
    font-family: 'SF Mono', 'Fira Mono', 'Cascadia Code', monospace;
    font-size: 11.5px;
    line-height: 1.65;
    color: #9ba3c2;
    white-space: pre;
    overflow-x: auto;
  }

  .skill-accordion-code .token-meta { color: #5c6080; }
  .skill-accordion-code .token-key { color: #7c83a8; }
  .skill-accordion-code .token-value { color: #b8bdd6; }
  .skill-accordion-code .token-heading { color: #c8cad8; font-weight: 600; }
  .skill-accordion-code .token-bullet { color: #5c6080; }

  .skill-accordion-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: linear-gradient(to bottom, transparent, #181b2a);
    pointer-events: none;
  }

  .skill-accordion-loading {
    padding: 24px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skill-accordion-skeleton {
    height: 11px;
    border-radius: 4px;
    background: #252842;
    animation: skill-skeleton-pulse 1.4s ease-in-out infinite;
  }

  @keyframes skill-skeleton-pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .skill-accordion-error {
    padding: 20px 14px;
    font-size: 12px;
    color: #5c6080;
    font-family: 'SF Mono', 'Fira Mono', 'Cascadia Code', monospace;
  }
`;

const COLLAPSED_HEIGHT = 280;

function tokenizeLine(line: string) {
  if (line.startsWith("---")) return <span className="token-meta">{line}</span>;
  if (/^(name|description):/.test(line)) {
    const colon = line.indexOf(":");
    return (
      <>
        <span className="token-key">{line.slice(0, colon + 1)}</span>
        <span className="token-value">{line.slice(colon + 1)}</span>
      </>
    );
  }
  if (/^#{1,3} /.test(line))
    return <span className="token-heading">{line}</span>;
  if (/^[-*] /.test(line)) {
    return (
      <>
        <span className="token-bullet">{line.slice(0, 2)}</span>
        <span>{line.slice(2)}</span>
      </>
    );
  }
  return <span>{line}</span>;
}

interface FileViewerProps {
  src: string;
  label?: string;
  filename?: string;
}

export function FileViewer({ src, label, filename }: FileViewerProps) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullHeight, setFullHeight] = useState<number>(0);
  const codeRef = useRef<HTMLPreElement>(null);

  const derivedFilename =
    filename ?? src.split("/").filter(Boolean).pop() ?? src;

  useEffect(() => {
    setLoading(true);
    setError(false);
    setContent(null);
    fetch(src)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [src]);

  useEffect(() => {
    if (codeRef.current && content !== null) {
      setFullHeight(codeRef.current.scrollHeight);
    }
  }, [content]);

  function handleCopy() {
    if (!content) return;

    function onSuccess() {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(content).then(onSuccess, fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const ta = document.createElement("textarea");
      ta.value = content!;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        onSuccess();
      } catch {
        /* silently fail */
      }
      document.body.removeChild(ta);
    }
  }

  const lines = content?.split("\n") ?? [];

  return (
    <>
      <style>{css}</style>
      <div className="skill-accordion">
        <div className="skill-accordion-bar">
          <div className="skill-accordion-bar-left">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="2" y="2" width="12" height="12" rx="2" />
              <path d="M5 8h6M5 5.5h6M5 10.5h4" strokeLinecap="round" />
            </svg>
            {label && <span className="skill-accordion-label">{label}</span>}
            <span className="skill-accordion-filename">{derivedFilename}</span>
          </div>
          <div className="skill-accordion-bar-right">
            <button
              className="skill-accordion-btn"
              onClick={handleCopy}
              disabled={!content}
            >
              {copied ? (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="4" y="4" width="7" height="7" rx="1.5" />
                  <path d="M8 4V2.5A1.5 1.5 0 006.5 1h-4A1.5 1.5 0 001 2.5v4A1.5 1.5 0 002.5 8H4" />
                </svg>
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              className={`skill-accordion-btn${expanded ? " expanded" : ""}`}
              onClick={() => setExpanded((v) => !v)}
              disabled={loading || error}
            >
              <svg
                className="chevron"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="M2 4l4 4 4-4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {expanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>

        <div
          className="skill-accordion-body"
          style={{
            maxHeight:
              loading || error
                ? undefined
                : expanded
                  ? fullHeight + 24
                  : COLLAPSED_HEIGHT,
          }}
        >
          {loading && (
            <div className="skill-accordion-loading">
              {[90, 70, 85, 55, 75, 65, 80].map((w, i) => (
                <div
                  key={i}
                  className="skill-accordion-skeleton"
                  style={{ width: `${w}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}
          {error && (
            <div className="skill-accordion-error">Failed to load {src}</div>
          )}
          {content !== null && (
            <>
              <pre ref={codeRef} className="skill-accordion-code">
                {lines.map((line, i) => (
                  <div key={i}>{line === "" ? "\n" : tokenizeLine(line)}</div>
                ))}
              </pre>
              {!expanded && <div className="skill-accordion-fade" />}
            </>
          )}
        </div>
      </div>
    </>
  );
}
