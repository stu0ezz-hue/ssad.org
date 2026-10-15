import { Handshake, Layers3, MapPinned, UsersRound } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { BiText, Counter } from "./ui";

export function Hero() {
  const { t, dir } = useLang();
  const headlineWords = t.hero.headline.split(/\s+/);
  const highlightedWord = headlineWords.pop();

  const heroStats = [
    { value: 1000, suffix: "+", label: t.hero.stats.beneficiaries, Icon: UsersRound },
    { value: 25, suffix: "+", label: t.hero.stats.projects, Icon: Layers3 },
    { value: 100, suffix: "+", label: t.hero.stats.volunteers, Icon: Handshake },
    { value: 10, suffix: "+", label: t.hero.stats.regions, Icon: MapPinned },
  ];

  return (
    <section
      id="home"
      className="relative isolate min-h-svh overflow-x-clip bg-white"
      aria-label={t.a11y.heroLabel}
    >
      <div className="absolute inset-x-0 top-0 z-0 h-[clamp(560px,82svh,680px)] overflow-hidden bg-navy-900 sm:h-[clamp(620px,72svh,740px)] lg:h-[clamp(700px,84svh,820px)]">
        <img
          src={`${import.meta.env.BASE_URL}images/hero.jpg`}
          alt=""
          aria-hidden
          className="h-full w-full object-cover object-[48%_center] sm:object-[44%_center] lg:object-[42%_center]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className={`absolute inset-0 ${
            dir === "rtl"
              ? "bg-gradient-to-l from-navy-900/95 via-navy-900/65 to-navy-900/10"
              : "bg-gradient-to-r from-navy-900/95 via-navy-900/65 to-navy-900/10"
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[clamp(560px,82svh,680px)] w-full max-w-7xl min-w-0 flex-col justify-center px-4 pb-24 pt-24 sm:min-h-[clamp(620px,72svh,740px)] sm:px-6 sm:pb-28 lg:min-h-[clamp(700px,84svh,820px)] lg:px-12 lg:pb-40">
        <div className="w-full min-w-0 max-w-2xl self-start text-start lg:max-w-[42rem]">
          <div className="mb-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/95 backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 lg:mb-3 lg:py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="mb-5 max-w-[17ch] text-balance text-[clamp(1.75rem,7.5vw,2.25rem)] font-bold leading-[1.3] tracking-tight text-white sm:mb-6 sm:text-[clamp(2.25rem,4.3vw,2.75rem)] lg:mb-3 lg:text-[clamp(2.5rem,4vw,4rem)] lg:leading-[1.25]">
            {headlineWords.join(" ")}{" "}
            <span className="text-gold-300">{highlightedWord}</span>
          </h1>

          <p className="mb-7 max-w-[52ch] text-sm leading-8 text-white/90 sm:mb-8 sm:text-base lg:mb-4 lg:text-base lg:leading-7">
            <BiText value={t.hero.sub} />
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            <a
              href="#programs"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gold-400 px-6 py-3 font-semibold text-navy-900 shadow-sm transition-colors hover:bg-gold-300 sm:px-7"
            >
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#cta"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/50 bg-white/5 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/15 sm:px-7"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-9 mb-10 grid w-[calc(100%-2rem)] max-w-[1150px] grid-cols-2 overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#ffffff_0%,#f8fcfb_50%,#eef8f6_100%)] p-1.5 shadow-[0_12px_36px_rgba(15,35,50,0.14)] sm:-mt-12 sm:w-[calc(100%-3rem)] sm:p-2 lg:-mt-24 lg:mb-14 lg:w-[86%] lg:max-w-[1150px] lg:grid-cols-4 lg:p-2.5">
        {heroStats.map(({ Icon, ...stat }, i) => (
          <div
            key={i}
            className={`relative flex min-h-[104px] flex-col items-center justify-center gap-1.5 px-4 py-5 text-center sm:min-h-[118px] sm:px-6 sm:py-6 lg:min-h-[140px] lg:px-6 lg:py-7 ${i % 2 === 1 ? "border-s border-navy-100" : ""} ${i > 1 ? "border-t border-navy-100 lg:border-t-0" : ""} ${i > 0 ? "lg:border-s lg:border-navy-100" : ""}`}
          >
            <Icon size={22} strokeWidth={1.7} className="shrink-0 text-sky-500" aria-hidden />
            <div className="text-xl font-bold leading-tight text-sky-500 tabular-nums sm:text-2xl lg:text-3xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[11px] font-medium leading-snug text-navy-500 sm:text-xs lg:text-sm">
              <BiText value={stat.label} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
