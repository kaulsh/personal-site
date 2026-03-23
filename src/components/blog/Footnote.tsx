import {
  useState,
  useEffect,
  useLayoutEffect,
  useReducer,
  useCallback,
  isValidElement,
  Children,
  type ReactNode,
} from "react";

// Lifecycle order for siblings in document order:
//   useLayoutEffect FnRef (1st) → useLayoutEffect FnRef (2nd) → useLayoutEffect FootnoteList
//   useEffect FnRef (1st) → ...
// Subscribing in useLayoutEffect ensures all FnRef components are registered
// before FootnoteList's useLayoutEffect fires and notifies them.
import { createPortal } from "react-dom";

// Module-level registry so FnRef components can look up their number without
// a wrapping provider. FootnoteList populates this on mount; FnRef subscribes.
const registry = new Map<string, { n: number; content: ReactNode }>();
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((fn) => fn());
}

const css = `
  .fn-ref-btn {
    display: inline;
    background: none;
    border: none;
    padding: 0 1px;
    cursor: pointer;
    font-size: 0.7em;
    vertical-align: super;
    line-height: 1;
    color: var(--accent);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    transition: opacity 0.15s;
    font-family: inherit;
  }

  .fn-ref-btn:hover {
    opacity: 0.7;
  }

  .fn-ref-btn:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 2px;
  }

  .fn-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9998;
  }

  .fn-modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: #1a1d2e;
    border-top: 1px solid #2a2d3e;
    padding: 16px 20px 28px;
    animation: fn-modal-in 0.18s ease;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.5);
  }

  @keyframes fn-modal-in {
    from { transform: translateY(10px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  .fn-modal-inner {
    max-width: 640px;
    margin: 0 auto;
  }

  .fn-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .fn-modal-num {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .fn-modal-close {
    background: none;
    border: none;
    color: #4a4f6a;
    cursor: pointer;
    padding: 3px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    transition: color 0.15s;
  }

  .fn-modal-close:hover {
    color: #9ba3c2;
  }

  .fn-modal-close svg {
    width: 13px;
    height: 13px;
  }

  .fn-modal-content {
    font-size: 0.875rem;
    color: var(--text);
    line-height: 1.65;
  }

  /* Footnote list at bottom of essay */
  .fn-list {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border);
    list-style: none;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .fn-list-item {
    display: flex;
    gap: 0.625rem;
    font-size: 0.85rem;
    color: #9ba3c2;
    line-height: 1.65;
  }

  .fn-list-num {
    color: var(--accent);
    font-weight: 700;
    font-size: 0.65rem;
    flex-shrink: 0;
    margin-top: 0.25rem;
    font-variant-numeric: tabular-nums;
  }
`;

// ─── FnRef ────────────────────────────────────────────────────────────────────

interface FnRefProps {
  id: string;
}

export function FnRef({ id }: FnRefProps) {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  useLayoutEffect(() => {
    subscribers.add(forceUpdate);
    return () => {
      subscribers.delete(forceUpdate);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const entry = registry.get(id);

  return (
    <>
      <button
        className="fn-ref-btn"
        onClick={() => setOpen(true)}
        aria-label={`Footnote ${entry?.n ?? id}`}
        type="button"
      >
        {entry ? entry.n : "?"}
      </button>
      {open &&
        entry &&
        createPortal(
          <>
            <div className="fn-modal-backdrop" onClick={handleClose} />
            <div
              className="fn-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`Footnote ${entry.n}`}
            >
              <div className="fn-modal-inner">
                <div className="fn-modal-header">
                  <span className="fn-modal-num">Footnote {entry.n}</span>
                  <button
                    className="fn-modal-close"
                    onClick={handleClose}
                    aria-label="Close footnote"
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
                </div>
                <div className="fn-modal-content">{entry.content}</div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

// ─── FnDef ────────────────────────────────────────────────────────────────────
// Pure data container — FootnoteList reads its props. Renders nothing on its own.

interface FnDefProps {
  id: string;
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FnDef(_: FnDefProps) {
  return null;
}

// ─── FootnoteList ─────────────────────────────────────────────────────────────

interface FootnoteListProps {
  children: ReactNode;
}

export function FootnoteList({ children }: FootnoteListProps) {
  const [entries, setEntries] = useState<
    Array<{ id: string; n: number; content: ReactNode }>
  >([]);

  // useLayoutEffect fires synchronously before paint, so FnRef components
  // re-render with the correct numbers before the user ever sees a "?".
  useLayoutEffect(() => {
    const newEntries: Array<{ id: string; n: number; content: ReactNode }> = [];
    let n = 1;

    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === FnDef) {
        const props = child.props as FnDefProps;
        registry.set(props.id, { n, content: props.children });
        newEntries.push({ id: props.id, n, content: props.children });
        n++;
      }
    });

    setEntries(newEntries);
    notifySubscribers();

    return () => {
      newEntries.forEach((e) => registry.delete(e.id));
    };
  }, [children]);

  return (
    <>
      <style>{css}</style>
      {entries.length > 0 && (
        <ol className="fn-list" aria-label="Footnotes">
          {entries.map(({ id, n, content }) => (
            <li key={id} id={`fn-${id}`} className="fn-list-item">
              <span className="fn-list-num" aria-hidden="true">
                {n}
              </span>
              <span>{content}</span>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
