import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { Menu, X } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { LANGS, LANG_INFO } from "../data/i18n";
import { Wordmark } from "./ui";

export function Header() {
  const { t, lang, setLang, dir } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 16,
  );
  const [activeHref, setActiveHref] = useState(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    return ["#home", "#about", "#programs", "#partners", "#impact", "#contact"].includes(hash)
      ? hash
      : "#home";
  });
  const activeHrefRef = useRef(activeHref);
  const [indicator, setIndicator] = useState({ offset: 0, width: 0, visible: false });
  const desktopNavRef = useRef<HTMLElement | null>(null);
  const desktopLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const pendingHrefRef = useRef<string | null>(null);
  const pendingNavigationRef = useRef<string | null>(null);

  const navigateToHash = (href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  // Resolve one active section per animation frame to avoid observer churn during smooth scroll.
  useEffect(() => {
    const sectionIds = ["home", "about", "programs", "partners", "impact", "contact"];
    const sections = sectionIds.map((id) => document.getElementById(id));
    if (!sections.length) return;

    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.28;
      const pendingHref = pendingHrefRef.current;
      const pendingSection = pendingHref
        ? document.getElementById(pendingHref.slice(1))
        : null;

      if (pendingHref && pendingSection) {
        const distanceToTarget = pendingSection.getBoundingClientRect().top - readingLine;
        if (Math.abs(distanceToTarget) < 80) pendingHrefRef.current = null;
        else {
          if (activeHrefRef.current !== pendingHref) {
            activeHrefRef.current = pendingHref;
            setActiveHref(pendingHref);
          }
          return;
        }
      }

      const measured = sections
        .filter((section): section is HTMLElement => Boolean(section))
        .map((section) => ({
          id: `#${section.id}`,
          distance: section.getBoundingClientRect().top - readingLine,
        }));
      const nextHref = measured.sort(
        (a, b) => Math.abs(a.distance) - Math.abs(b.distance),
      )[0]?.id;
      if (nextHref && nextHref !== activeHrefRef.current) {
        activeHrefRef.current = nextHref;
        setActiveHref(nextHref);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };
    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Keep one shared indicator aligned with the active desktop link.
  useLayoutEffect(() => {
    const nav = desktopNavRef.current;
    const link = desktopLinkRefs.current[activeHref];
    if (!nav || !link) return;

    const updateIndicator = () => {
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const offset = linkRect.left - navRect.left;
      const nextIndicator = {
        offset: Math.max(0, offset),
        width: linkRect.width,
        visible: true,
      };
      setIndicator((current) =>
        Math.abs(current.offset - nextIndicator.offset) < 0.25 &&
        Math.abs(current.width - nextIndicator.width) < 0.25 &&
        current.visible
          ? current
          : nextIndicator,
      );
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(nav);
    resizeObserver.observe(link);
    window.addEventListener("resize", updateIndicator);
    const frame = window.requestAnimationFrame(updateIndicator);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
      window.cancelAnimationFrame(frame);
    };
  }, [activeHref, dir, lang]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Unlock before applying a mobile menu link's hash navigation.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (!mobileOpen && pendingNavigationRef.current) {
      const href = pendingNavigationRef.current;
      pendingNavigationRef.current = null;
      navigateToHash(href);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links: { href: string; label: string }[] = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#programs", label: t.nav.programs },
    { href: "#partners", label: t.nav.partners },
    { href: "#impact", label: t.nav.impact },
    { href: "#contact", label: t.nav.contact },
  ];

  const onNavClick = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    href?: string,
  ) => {
    event.preventDefault();
    if (href) {
      if (links.some((link) => link.href === href)) {
        pendingHrefRef.current = href;
        activeHrefRef.current = href;
        setActiveHref(href);
      }
      if (mobileOpen) {
        pendingNavigationRef.current = href;
      } else {
        navigateToHash(href);
      }
    }
    setMobileOpen(false);
  };

  const useLightHeader = isScrolled || mobileOpen;
  const headerText = useLightHeader ? "text-navy-900" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        useLightHeader
          ? "border-sand-200 bg-white/95 shadow-sm backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
      role="banner"
      dir={dir}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          {/* Logo */}
          <a
            href="#home"
            className="order-1 flex items-center shrink-0"
            aria-label={t.a11y.logo}
          >
            <Wordmark light={!useLightHeader} />
          </a>

          {/* Desktop Nav */}
          <nav
            ref={desktopNavRef}
            className="relative hidden lg:flex items-center gap-0.5 order-2 xl:gap-2"
            aria-label={t.a11y.mainNav}
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                ref={(element) => {
                  desktopLinkRefs.current[link.href] = element;
                }}
                onClick={(event) => onNavClick(event, link.href)}
                aria-current={activeHref === link.href ? "page" : undefined}
                className={`whitespace-nowrap px-2.5 py-2 text-[13.5px] font-medium rounded-md transition-colors xl:px-4 xl:text-[14.5px] ${
                  useLightHeader
                    ? "hover:bg-navy-50 hover:text-navy-900"
                    : "hover:bg-white/10 hover:text-white"
                } ${headerText}`}
              >
                {link.label}
              </a>
            ))}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute bottom-0 left-0 h-0.5 rounded-full bg-current transition-[transform,width,opacity] duration-[300ms] ease-out ${headerText} ${
                indicator.visible ? "opacity-100" : "opacity-0"
              }`}
              style={{
                width: indicator.width,
                transform: `translateX(${indicator.offset}px)`,
              }}
            />
          </nav>
        {/* Right side */}
          <div className="order-3 flex items-center gap-3">
            {/* Language Switcher */}
            <div
              className={`hidden sm:flex items-center text-xs font-semibold rounded-md border ${
                useLightHeader
                  ? "border-navy-200 text-navy-700"
                  : "border-white/35 text-white"
              }`}
              dir="ltr"
              role="group"
              aria-label={t.a11y.languageGroup}
            >
              {LANGS.map((code, i) => (
                <Fragment key={code}>
                  <button
                    type="button"
                    onClick={() => setLang(code)}
                    className={`px-3 py-1.5 transition-colors ${
                      lang === code
                        ? useLightHeader
                          ? "bg-navy-800 text-white"
                          : "bg-white/20 text-white"
                        : useLightHeader
                          ? "hover:bg-navy-50"
                          : "hover:bg-white/10"
                    } ${i === 0 ? "rounded-s-md" : ""} ${
                      i === LANGS.length - 1 ? "rounded-e-md" : ""
                    }`}
                    aria-pressed={lang === code}
                  >
                    {LANG_INFO[code].short}
                  </button>
                  {i < LANGS.length - 1 && (
                    <span
                      className={`w-px self-stretch ${
                        useLightHeader ? "bg-navy-200" : "bg-white/30"
                      }`}
                      aria-hidden
                    />
                  )}
                </Fragment>
              ))}
            </div>

            {/* Donate CTA */}
            <a
              href="#cta"
              className="hidden sm:inline-flex shrink-0 min-h-10 items-center gap-2 whitespace-nowrap bg-gold-400 hover:bg-gold-300 text-navy-900 font-semibold text-[13px] px-4 py-2 rounded-md transition-all shadow-sm hover:shadow-md xl:text-[14px] xl:px-5"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/donate.png`}
                alt=""
                aria-hidden="true"
                className="w-6 h-6 object-contain shrink-0"
              />
              {t.nav.donate}
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                useLightHeader
                  ? "text-navy-900 hover:bg-navy-50"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label={mobileOpen ? t.a11y.closeMenu : t.a11y.openMenu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ${
          mobileOpen ? "max-h-[560px]" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-sand-200 shadow-lg">
          <nav className="px-5 py-5 space-y-1" aria-label={t.a11y.mobileNav}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => onNavClick(event, link.href)}
                className="block px-3 py-3 text-[15px] font-medium text-navy-800 rounded-md hover:bg-sand-50"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-sand-200 flex items-center justify-between gap-3">
              <div className="flex items-center text-xs font-semibold rounded-md border border-navy-200 text-navy-700" dir="ltr">
                {LANGS.map((code, i) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    className={`px-3 py-2 transition-colors ${
                      lang === code ? "bg-navy-800 text-white" : "hover:bg-sand-50"
                    } ${i === 0 ? "rounded-s-md" : ""} ${
                      i === LANGS.length - 1 ? "rounded-e-md" : ""
                    }`}
                  >
                    {LANG_INFO[code].short}
                  </button>
                ))}
              </div>
              <a
                href="#cta"
                onClick={(event) => onNavClick(event, "#cta")}
                className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap bg-gold-400 hover:bg-gold-300 text-navy-900 font-semibold text-sm px-5 py-2.5 rounded-md"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/donate.png`}
                  alt=""
                  aria-hidden="true"
                  className="w-6 h-6 object-contain shrink-0"
                />
                {t.nav.donate}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
