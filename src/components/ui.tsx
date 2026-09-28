import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLang } from "../contexts/LanguageContext";

/* ---------- Reveal on scroll ---------- */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- Animated Counter ---------- */
export function Counter({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const { lang } = useLang();
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} aria-live="polite">
      {display.toLocaleString(lang)}
      {suffix}
    </span>
  );
}

/* ---------- Localized text helper ---------- */
export function BiText({
  value,
  className,
  as: Tag = "span",
}: {
  value: string;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div" | "li" | "a";
}) {
  return <Tag className={className}>{value}</Tag>;
}

/* ---------- Accessible dialog ---------- */
export function Dialog({
  open,
  onOpenChange,
  title,
  closeLabel,
  dir,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  closeLabel: string;
  dir: "rtl" | "ltr";
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.focus();
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const elements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      restoreFocusRef.current?.focus();
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/70 p-5 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        dir={dir}
        className="relative max-h-[min(680px,calc(100vh-2.5rem))] w-full max-w-2xl overflow-y-auto rounded-lg border border-sand-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label={closeLabel}
          className="absolute end-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-md text-2xl leading-none text-navy-700 transition-colors hover:bg-navy-50 hover:text-navy-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        >
          <span aria-hidden="true">×</span>
        </button>
        <h2 id={titleId} className="pe-12 text-2xl font-bold leading-snug text-navy-900">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </div>,
    document.body,
  );
}

/* ---------- Section wrapper ---------- */
export function Section({
  id,
  className = "",
  eyebrow,
  title,
  children,
  subtle = false,
}: {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  subtle?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative ${subtle ? "bg-sand-50" : "bg-white"} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 md:py-28">
        {(eyebrow || title) && (
          <div className="max-w-3xl mb-12 md:mb-16">
            {eyebrow && (
              <Reveal>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-10 bg-gold-400" />
                  <BiText
                    value={eyebrow}
                    className="text-[13px] tracking-[0.18em] uppercase text-teal-600 font-semibold"
                  />
                </div>
              </Reveal>
            )}
            {title && (
              <Reveal delay={120}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-navy-900 leading-tight tracking-tight">
                  <BiText value={title} />
                </h2>
              </Reveal>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/* ---------- Buttons ---------- */
export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-50 disabled:pointer-events-none";
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-[15px] rounded-md",
    lg: "px-8 py-4 text-base rounded-md",
  };
  const variants = {
    primary:
      "bg-navy-800 text-white hover:bg-navy-700 shadow-sm hover:shadow-md",
    secondary:
      "bg-gold-400 text-navy-900 hover:bg-gold-300 shadow-sm hover:shadow-md",
    outline:
      "border border-navy-800/30 text-navy-900 hover:bg-navy-800 hover:text-white",
    ghost: "text-navy-900 hover:bg-navy-50",
  };
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

/* ---------- Wordmark ---------- */
// Fixed brand lockup: the Latin brand name stays identical in every language.
const BRAND_NAME = "Shababna Sanad";

export function Wordmark({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Logo icon — static, no hover / transition effects */}
      <img
        src={`${import.meta.env.BASE_URL}images/shababnaSanadLogo.png`}
        alt=""
        className="h-10 w-10 sm:h-11 sm:w-11 object-contain select-none shrink-0"
        draggable={false}
        loading="eager"
      />
      {/* Logo name — white on dark surfaces (hero / navy footer) */}
      <span
        className={`text-lg sm:text-xl font-bold tracking-tight leading-none whitespace-nowrap ${
          light ? "text-white" : "text-navy-900"
        }`}
      >
        {BRAND_NAME}
      </span>
    </div>
  );
}

/* ---------- Decorative divider ---------- */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      aria-hidden
    >
      <span className="h-px w-8 bg-gold-400" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
      <span className="h-px w-16 bg-navy-200" />
    </div>
  );
}
