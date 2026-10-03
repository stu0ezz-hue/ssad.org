import { CheckCircle2, ArrowRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { BiText, Reveal, Section } from "./ui";
import * as Icons from "lucide-react";

export function About() {
  const { t, dir } = useLang();
  const ArrowIcon = dir === "rtl" ? Icons.ArrowLeft : ArrowRight;

  return (
    <Section id="about" eyebrow={t.about.eyebrow} title={t.about.title}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image */}
        <Reveal>
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src={`${import.meta.env.BASE_URL}images/about.jpg`}
                alt={t.about.imageAlt}
                className="w-full h-[400px] md:h-[500px] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div
                className="absolute inset-0 bg-gradient-to-tr from-navy-900/30 to-transparent"
                aria-hidden
              />
            </div>
            {/* Decorative accent */}
            <div
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-400/20 rounded-lg -z-10"
              aria-hidden
            />
            <div
              className="absolute -top-6 -left-6 w-24 h-24 bg-teal-500/20 rounded-full -z-10"
              aria-hidden
            />
            {/* Floating card */}
            <div className="absolute -bottom-8 start-6 md:start-10 bg-white shadow-xl rounded-lg p-5 border border-sand-200 max-w-[220px]">
              <div className="text-3xl font-bold text-navy-900 mb-1 tabular-nums">
                +100
              </div>
              <div className="text-sm text-navy-600 font-medium">
                {t.about.floatingStat}
              </div>
              <div className="mt-3 h-1 w-full bg-sand-100 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-teal-500 to-gold-400 rounded-full" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <div>
          <Reveal>
            {t.about.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-navy-700 text-base md:text-lg leading-relaxed mb-5"
              >
                <BiText value={p} />
              </p>
            ))}
          </Reveal>

          <Reveal delay={120}>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {t.about.values.map((v, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-sand-50 border border-sand-100 hover:border-teal-200 hover:bg-teal-50/40 transition-colors"
                >
                  <CheckCircle2
                    size={20}
                    className="text-teal-600 mt-0.5 shrink-0"
                    aria-hidden
                  />
                  <div>
                    <div className="font-semibold text-navy-900 mb-1">
                      <BiText value={v.title} />
                    </div>
                    <div className="text-sm text-navy-600 leading-relaxed">
                      <BiText value={v.desc} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <a
              href="#mission"
              className="group inline-flex items-center gap-2 mt-8 text-navy-900 font-semibold hover:text-teal-600 transition-colors"
            >
              {t.about.cta}
              <ArrowIcon
                size={18}
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
              />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Mission + Vision ---------- */
export function MissionVision() {
  const { t } = useLang();

  return (
    <section id="mission" className="relative bg-navy-900 text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(224, 180, 82, 0.8) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(20, 125, 96, 0.8) 0%, transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 md:py-28">
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

/* ---------- Areas of Work ---------- */
export function AreasOfWork() {
  const { t } = useLang();

  return (
    <Section
      id="areas"
      subtle
      eyebrow={t.areas.eyebrow}
      title={t.areas.title}
    >
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6 lg:grid-cols-3">
        {t.areas.items.map((area, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[
            area.icon
          ] as Icons.LucideIcon | undefined;
          return (
            <Reveal key={area.key} delay={i * 80}>
              <article className="group h-full bg-white border border-sand-200 rounded-lg p-4 sm:p-7 md:p-8 hover:border-teal-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-navy-800 text-gold-300 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    {Icon ? <Icon size={24} strokeWidth={1.8} /> : null}
                  </div>
                  <div className="h-px flex-1 bg-sand-200 group-hover:bg-teal-200 transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-2 sm:mb-3 leading-snug">
                  <BiText value={area.title} />
                </h3>
                <p className="text-sm sm:text-[15px] text-navy-600 leading-relaxed">
                  <BiText value={area.desc} />
                </p>
                <div
                  className="mt-6 flex items-center gap-2 text-sm font-semibold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                >
                  <span className="h-px w-6 bg-teal-600" />
                  <span>{t.about.cta}</span>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
