import { ArrowRight, GraduationCap, HandHeart, Sprout, UsersRound } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { BiText, Reveal } from "./ui";
import * as Icons from "lucide-react";

export function About() {
  const { t, dir } = useLang();
  const ArrowIcon = dir === "rtl" ? Icons.ArrowLeft : ArrowRight;
  const objectiveIcons = [GraduationCap, UsersRound, Sprout, HandHeart];

  return (
    <section id="about" className="section-anchor relative flex min-h-svh items-center bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-9 sm:px-8 sm:py-12 lg:grid-cols-[0.85fr_1.55fr] lg:gap-14 lg:px-12 lg:py-9">
        <Reveal className="order-2 lg:order-2">
          <div className="rounded-lg border border-navy-50 bg-navy-50/80 p-5 sm:p-7 lg:p-8">
            <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-sky-700">
              <span className="h-px w-8 bg-sky-600" aria-hidden />
              <BiText value={t.about.objectivesLabel} />
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-4">
              {t.about.values.map((objective, i) => {
                const Icon = objectiveIcons[i];
                return (
                  <div key={objective.title} className="text-center">
                    <div
                        className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-md border border-navy-100 bg-white text-navy-700 sm:h-14 sm:w-14"
                    >
                      <Icon size={25} strokeWidth={1.8} aria-hidden />
                    </div>
                    <h3 className="mb-1.5 text-sm font-bold text-navy-800 sm:text-base">
                      <BiText value={objective.title} />
                    </h3>
                    <p className="text-xs leading-6 text-slate-600 sm:text-sm">
                      <BiText value={objective.desc} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="order-1 text-start lg:order-1">
          <Reveal>
            <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-sky-700">
              <BiText value={t.about.eyebrow} />
              <span className="h-px w-8 bg-sky-600" aria-hidden />
            </div>
            <h2 className="mb-4 text-2xl font-bold leading-tight text-navy-800 sm:text-3xl lg:text-4xl">
              <BiText value={t.about.title} as="span" />
            </h2>
            <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              {t.about.paragraphs[1]}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <a
              href="#mission"
              className="group mt-6 inline-flex min-h-11 items-center gap-3 rounded-md border border-navy-500 px-5 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-50"
            >
              {t.about.cta}
              <ArrowIcon
                size={17}
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                aria-hidden
              />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mission + Vision ---------- */
export function MissionVision() {
  const { t } = useLang();

  return (
    <section id="mission" className="relative flex min-h-svh items-center bg-navy-900 text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(224, 180, 82, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20, 125, 96, 0.8) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-20 md:py-28">
        {/* Mission */}
        <Reveal>
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-gold-400" />
              <span className="text-[13px] tracking-[0.18em] uppercase text-gold-300 font-semibold">
                <BiText value={t.mission.title} />
              </span>
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.25] tracking-tight">
              <BiText value={t.mission.text} />
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-1 w-16 bg-gold-400" />
              <span className="h-1 w-3 bg-gold-400/60" />
              <span className="h-1 w-1 bg-gold-400/30" />
            </div>
          </div>
        </Reveal>

        {/* Vision */}
        <Reveal delay={200}>
          <div className="mt-20 md:mt-28 max-w-5xl border-t border-white/10 pt-16 md:pt-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-10 bg-teal-400" />
              <span className="text-[13px] tracking-[0.18em] uppercase text-teal-300 font-semibold">
                <BiText value={t.vision.title} />
              </span>
            </div>
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.35] tracking-tight text-white/90">
              <BiText value={t.vision.text} />
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
