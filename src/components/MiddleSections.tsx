import { ArrowLeft, ArrowRight, Award, Download, FileText, Heart, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { useLang } from "../contexts/LanguageContext";
import { BiText, Counter, Dialog, Reveal, Section } from "./ui";

/* ---------- Programs ---------- */
export function Programs() {
  const { t, dir } = useLang();
  const [programIndex, setProgramIndex] = useState<number | null>(null);
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);
  const activeProgram = programIndex === null ? null : t.programs.items[programIndex];
  const activeServices = activeProgram && "details" in activeProgram ? activeProgram.details : [];
  const activeService = serviceIndex === null ? null : activeServices[serviceIndex];
  const isPdf = activeService?.file ? /\.pdf(?:$|\?)/i.test(activeService.file) : false;
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;

  return (
    <Section
      id="programs"
      eyebrow={t.programs.eyebrow}
      title={t.programs.title}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {t.programs.items.map((program, i) => (
          <Reveal key={i} delay={i * 100}>
            <article className="group h-full bg-white border border-sand-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={program.image}
                  alt={"imageAlt" in program ? program.imageAlt : program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/20 to-transparent"
                  aria-hidden
                />
                <div className="absolute top-4 start-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full text-xs font-semibold text-navy-900">
                    <Users size={14} className="text-teal-600" />
                    <BiText value={"badge" in program ? program.badge : program.title} />
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-navy-900 mb-3 leading-snug">
                  <BiText value={program.title} />
                </h3>
                <p className="text-navy-600 leading-relaxed text-[15px] mb-5 flex-1">
                  <BiText value={program.desc} />
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-sand-200">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-gold-500" />
                    <span className="text-sm font-bold text-navy-900">
                      <BiText value={program.metric} />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setProgramIndex(i)}
                    className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
                  >
                    <BiText value={program.cta} />
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      {activeProgram && (
        <Dialog
          open={serviceIndex === null}
          onOpenChange={(open) => {
            if (!open) setProgramIndex(null);
          }}
          title={activeProgram.title}
          closeLabel={t.a11y.closeDialog}
          dir={dir}
        >
          <p className="max-w-2xl text-[15px] leading-relaxed text-navy-600">
            {activeProgram.desc}
          </p>
          <h3 className="mt-7 text-sm font-bold uppercase tracking-[0.12em] text-teal-700">
            {t.a11y.programServices}
          </h3>
          {activeServices.length > 0 ? (
            <ul className="mt-3 grid gap-3" aria-label={t.a11y.programServices}>
              {activeServices.map((detail, detailIndex) => (
              <li
                key={detail.id}
                className="grid gap-3 border border-sand-200 rounded-md p-4 transition-colors hover:border-teal-200 hover:bg-sand-50 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center md:gap-5"
              >
                <span className="min-w-0 font-semibold leading-relaxed text-navy-800">{detail.label}</span>
                <span className="font-bold leading-relaxed text-teal-700 md:text-center">{detail.value}</span>
                <button
                  type="button"
                  onClick={() => setServiceIndex(detailIndex)}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-teal-600 px-3 py-2 text-sm font-semibold text-teal-700 transition-all hover:bg-teal-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 md:min-w-40"
                >
                  {t.a11y.viewDetails}
                  {dir === "rtl" ? <ArrowLeft size={15} aria-hidden="true" /> : <ArrowRight size={15} aria-hidden="true" />}
                </button>
              </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 rounded-md border border-sand-200 bg-sand-50 p-4 text-[15px] leading-relaxed text-navy-600">
              {t.a11y.fileUnavailable}
            </p>
          )}
        </Dialog>
      )}
      {activeProgram && activeService && (
        <Dialog
          open
          onOpenChange={(open) => {
            if (!open) setServiceIndex(null);
          }}
          title={activeService.label}
          closeLabel={t.a11y.closeDialog}
          dir={dir}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 pb-5">
            <span className="font-bold text-teal-700">{activeService.value}</span>
            <button
              type="button"
              onClick={() => setServiceIndex(null)}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              <BackIcon size={16} aria-hidden="true" />
              {t.a11y.backToProgram}
            </button>
          </div>
          {activeService.file ? (
            <div className="mt-5 space-y-4">
              {isPdf && (
                <iframe
                  src={activeService.file}
                  title={activeService.label}
                  className="h-[min(55vh,520px)] w-full rounded-md border border-sand-200"
                />
              )}
              <a
                href={activeService.file}
                download
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-navy-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
              >
                <Download size={16} aria-hidden="true" />
                {t.a11y.downloadFile}
              </a>
            </div>
          ) : (
            <div className="mt-5 rounded-md border border-sand-200 bg-sand-50 p-5 text-center">
              <FileText className="mx-auto mb-3 text-gold-500" size={28} aria-hidden="true" />
              <p className="text-[15px] leading-relaxed text-navy-600">{t.a11y.fileUnavailable}</p>
            </div>
          )}
        </Dialog>
      )}
    </Section>
  );
}

/* ---------- Impact Statistics ---------- */
export function Impact() {
  const { t } = useLang();
  const icons = [Users, Heart, MapPin, Award];

  return (
    <section id="impact" className="relative bg-navy-900 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, rgba(20, 125, 96, 0.4) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(224, 180, 82, 0.3) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-20 md:py-28">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-10 bg-gold-400" />
              <span className="text-[13px] tracking-[0.18em] uppercase text-gold-300 font-semibold">
                <BiText value={t.impact.eyebrow} />
              </span>
              <span className="h-px w-10 bg-gold-400" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              <BiText value={t.impact.title} />
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.impact.items.map((stat, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="relative text-center p-8 md:p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-400/20 text-gold-300 mb-5">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>
                  <div
                    className="w-full min-w-0 whitespace-nowrap text-4xl font-bold text-white mb-3 tabular-nums"
                    dir="ltr"
                  >
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-base md:text-lg text-white/80 font-medium">
                    <BiText value={stat.label} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Stories ---------- */
export function Stories() {
  const { t } = useLang();

  return (
    <Section
      eyebrow={t.stories.eyebrow}
      title={t.stories.title}
      subtle
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {t.stories.items.map((story, i) => (
          <Reveal key={i} delay={i * 100}>
            <article className="group h-full bg-white border border-sand-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="h-px w-6 bg-gold-400" />
                  <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                    <BiText value={story.program} />
                  </span>
                </div>
                <blockquote className="text-navy-700 leading-relaxed text-[15px] mb-5 flex-1">
                  <span className="text-3xl text-gold-400 font-serif leading-none">"</span>
                  <BiText value={story.quote} />
                  <span className="text-3xl text-gold-400 font-serif leading-none">"</span>
                </blockquote>
                <div className="pt-5 border-t border-sand-200 flex items-center justify-between">
                  <div className="font-semibold text-navy-900">
                    <BiText value={story.name} />
                  </div>
                  <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                    {t.stories.readStory}
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
