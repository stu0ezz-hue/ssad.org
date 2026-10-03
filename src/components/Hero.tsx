import { ArrowDown } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { BiText, Counter } from "./ui";

export function Hero() {
  const { t } = useLang();

  const heroStats = [
    { value: 1000, suffix: "+", label: t.hero.stats.beneficiaries },
    { value: 25, suffix: "+", label: t.hero.stats.initiatives },
    { value: 100, suffix: "+", label: t.hero.stats.volunteers },
    { value: 10, suffix: "+", label: t.hero.stats.regions },
  ];

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden sm:min-h-screen"
      aria-label={t.a11y.heroLabel}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero.jpg`}
          alt=""
          aria-hidden
          className="w-full h-full object-cover scale-105"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy-900/75 via-navy-900/35 to-navy-900/5" />
        <div
          className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-navy-900/5 to-transparent"
          aria-hidden
        />
      </div>

      {/* Decorative top accent */}
      <div
        className="absolute top-0 inset-x-0 h-20 sm:h-24 bg-gradient-to-b from-navy-900/30 to-transparent pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-8 pt-24 sm:px-8 sm:pb-20 sm:pt-32 lg:px-12 md:pt-40 md:pb-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs sm:text-sm font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300 animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-balance text-[clamp(2rem,8vw,3rem)] font-bold leading-[1.22] tracking-tight text-white sm:text-5xl sm:leading-[1.15] lg:text-6xl xl:text-7xl mb-4 sm:mb-6">
            <BiText value={t.hero.headline} as="span" />
            <span className="hidden sm:block mt-2 text-gold-300 text-3xl lg:text-4xl font-semibold tracking-tight">
              {t.hero.brandSpan}
            </span>
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-white/90 leading-relaxed max-w-[34ch] sm:max-w-2xl mb-6 sm:mb-10">
            <BiText value={t.hero.sub} />
          </p>

          <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:gap-4">
            <a
              href="#programs"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-gold-400 px-5 py-3 font-semibold text-navy-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-gold-300 hover:shadow-xl sm:w-auto sm:px-7"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#cta"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-white/40 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto sm:px-7"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:mt-16 sm:gap-4 md:mt-24 md:grid-cols-4 md:gap-6">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="relative rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-md transition-colors hover:bg-white/10 sm:border-white/15 sm:p-4 lg:p-6"
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gold-300 mb-1 sm:mb-1.5 tabular-nums">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-white/85 font-medium">
                  <BiText value={stat.label} />
                </div>
                <div
                  className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
                  aria-hidden
                />
              </div>
            ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label={t.a11y.scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/30 text-white/70 hover:bg-white/10 hover:text-white transition-colors animate-fade-in"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </a>
    </section>
  );
}
