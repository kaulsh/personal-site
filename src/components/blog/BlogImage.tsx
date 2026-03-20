import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

const css = `
  .blog-image-trigger {
    display: block;
    width: 100%;
    margin: 24px 0;
    padding: 0;
    background: none;
    overflow: hidden;
    cursor: zoom-in;
    position: relative;
    text-align: left;
    border: none;
		outline: none;
  }

  .blog-image-trigger:focus-visible {
    outline: 2px solid #4a4f6a;
    outline-offset: 2px;
  }

  .blog-image-trigger img {
    display: block;
    width: 100%;
    height: auto;
    transition: opacity 0.15s;
  }

  .blog-image-trigger:hover img {
    opacity: 0.88;
  }

  .blog-image-expand-hint {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(24, 27, 42, 0.82);
    border: 1px solid #2a2d3e;
    border-radius: 6px;
    padding: 5px 7px;
    display: flex;
    align-items: center;
    gap: 5px;
    opacity: 0;
    transition: opacity 0.15s;
    pointer-events: none;
    color: #9ba3c2;
    font-size: 11px;
    font-weight: 500;
    font-family: var(--font-sans, 'Inter', sans-serif);
    letter-spacing: 0.02em;
    backdrop-filter: blur(4px);
  }

  .blog-image-expand-hint svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }

  .blog-image-trigger:hover .blog-image-expand-hint {
    opacity: 1;
  }

  .blog-image-caption {
    padding: 8px 12px;
    font-size: 12px;
    color: #4a4f6a;
    background: #1f2235;
    font-family: var(--font-sans, 'Inter', sans-serif);
    border-top: 1px solid #2a2d3e;
    line-height: 1.5;
  }

  .blog-image-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(8, 9, 16, 0.92);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    cursor: zoom-out;
    backdrop-filter: blur(6px);
    animation: blog-image-backdrop-in 0.18s ease;
  }

  @keyframes blog-image-backdrop-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .blog-image-lightbox-img {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 8px;
    box-shadow: 0 32px 96px rgba(0, 0, 0, 0.7);
    cursor: default;
    animation: blog-image-img-in 0.2s ease;
    border: 1px solid #2a2d3e;
  }

  @keyframes blog-image-img-in {
    from { transform: scale(0.97); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  .blog-image-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: rgba(24, 27, 42, 0.9);
    border: 1px solid #2a2d3e;
    color: #9ba3c2;
    border-radius: 8px;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: color 0.15s, background 0.15s;
    backdrop-filter: blur(4px);
  }

  .blog-image-close:hover {
    color: #c8cad8;
    background: #252842;
  }

  .blog-image-close svg {
    width: 12px;
    height: 12px;
  }
`;

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function BlogImage({ src, alt, caption }: BlogImageProps) {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, handleClose]);

  return (
    <>
      <style>{css}</style>
      <button
        className="blog-image-trigger"
        onClick={() => setOpen(true)}
        aria-label={`View full size: ${alt}`}
        type="button"
      >
        <img src={src} alt={alt} />
        <span className="blog-image-expand-hint">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path
              d="M7.5 1H11v3.5M1 7.5V11h3.5M11 1L6.5 5.5M1 11l4.5-4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Expand
        </span>
        {caption && <div className="blog-image-caption">{caption}</div>}
      </button>

      {open &&
        createPortal(
          <div className="blog-image-backdrop" onClick={handleClose}>
            <img
              src={src}
              alt={alt}
              className="blog-image-lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="blog-image-close"
              onClick={handleClose}
              aria-label="Close"
              type="button"
            >
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M1 1l10 10M11 1L1 11" strokeLinecap="round" />
              </svg>
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
