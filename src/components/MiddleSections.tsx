import { ArrowLeft, ArrowLeftRight, ArrowRight, Award, Download, FileText, Heart, MapPin, Users } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { useLang } from "../contexts/LanguageContext";
import { BiText, Counter, Dialog, Reveal, Section } from "./ui";

function resolvePublicAsset(path: string) {
  return path.startsWith("/") ? `${import.meta.env.BASE_URL}${path.slice(1)}` : path;
}

/* ---------- Programs ---------- */
export function Programs() {
  const { t, dir } = useLang();
  const items = t.programs.items;
  const cloneCount = Math.min(2, items.length);
  const [programIndex, setProgramIndex] = useState<number | null>(null);
  const [serviceIndex, setServiceIndex] = useState<number | null>(null);
  const [trackIndex, setTrackIndex] = useState(cloneCount);
  const [slideStep, setSlideStep] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const trackIndexRef = useRef(cloneCount);
  const transitionTimerRef = useRef<number | null>(null);
  const pointerStartRef = useRef<{ pointerId: number; x: number } | null>(null);
  const dragMovedRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const activeProgram = programIndex === null ? null : t.programs.items[programIndex];
  const activeServices = activeProgram && "details" in activeProgram ? activeProgram.details : [];
  const activeService = serviceIndex === null ? null : activeServices[serviceIndex];
  const isPdf = activeService?.file ? /\.pdf(?:$|\?)/i.test(activeService.file) : false;
  const BackIcon = dir === "rtl" ? ArrowRight : ArrowLeft;
  const PreviousIcon = dir === "rtl" ? ArrowRight : ArrowLeft;
  const NextIcon = dir === "rtl" ? ArrowLeft : ArrowRight;
  const trackSlides = items.length > 0
    ? [
        ...items.slice(-cloneCount).map((program, index) => ({
          program,
          logicalIndex: items.length - cloneCount + index,
          isClone: true,
        })),
        ...items.map((program, logicalIndex) => ({ program, logicalIndex, isClone: false })),
        ...items.slice(0, cloneCount).map((program, logicalIndex) => ({
          program,
          logicalIndex,
          isClone: true,
        })),
      ]
    : [];
  const activeSlideIndex = items.length === 0 ? 0 : (trackIndex - cloneCount + items.length) % items.length;
  const trackOffset =
    (trackIndex - (trackSlides.length - 1) / 2) * slideStep * (dir === "rtl" ? 1 : -1) + dragOffset;

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!viewport || !track || !firstSlide) return;

    const measureSlideStep = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      setSlideStep(firstSlide.offsetWidth + gap);
    };

    measureSlideStep();
    const observer = new ResizeObserver(measureSlideStep);
    observer.observe(viewport);
    observer.observe(firstSlide);
    return () => observer.disconnect();
  }, [items.length]);

  const completeTrackTransition = () => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    const currentIndex = trackIndexRef.current;
    if (currentIndex < cloneCount || currentIndex >= cloneCount + items.length) {
      setTransitionEnabled(false);
      const resetIndex = currentIndex < cloneCount ? currentIndex + items.length : currentIndex - items.length;
      trackIndexRef.current = resetIndex;
      setTrackIndex(resetIndex);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setTransitionEnabled(true);
        isTransitioningRef.current = false;
      }));
      return;
    }

    isTransitioningRef.current = false;
  };

  const moveToTrackIndex = (nextIndex: number) => {
    if (!slideStep || isTransitioningRef.current || nextIndex === trackIndex) return;
    isTransitioningRef.current = true;
    trackIndexRef.current = nextIndex;
    setTrackIndex(nextIndex);
    transitionTimerRef.current = window.setTimeout(completeTrackTransition, 700);
  };

  const moveBy = (direction: -1 | 1) => moveToTrackIndex(trackIndex + direction);

  const handleTrackTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    completeTrackTransition();
  };

  const handleCarouselKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const previousKey = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    const nextKey = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    if (event.key === previousKey) {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === nextKey) {
      event.preventDefault();
      moveBy(1);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (isTransitioningRef.current) return;
    if (event.target instanceof Element && event.target.closest("button")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerStartRef.current = { pointerId: event.pointerId, x: event.clientX };
    dragMovedRef.current = false;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (pointerStartRef.current?.pointerId !== event.pointerId) return;
    const delta = event.clientX - pointerStartRef.current.x;
    if (Math.abs(delta) > 8) dragMovedRef.current = true;
    setDragOffset(delta);
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerStart = pointerStartRef.current;
    if (!pointerStart || pointerStart.pointerId !== event.pointerId) return;
    const delta = event.clientX - pointerStart.x;
    if (Math.abs(delta) > 48) {
      const isNext = dir === "rtl" ? delta < 0 : delta > 0;
      moveBy(isNext ? 1 : -1);
    }
    pointerStartRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  const cancelPointerDrag = () => {
    pointerStartRef.current = null;
    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <Section
      id="programs"
      eyebrow={t.programs.eyebrow}
      title={t.programs.title}
    >
      <Reveal>
        <div className="relative">
          <div
            ref={viewportRef}
            role="region"
            aria-roledescription="carousel"
            aria-label={t.programs.title}
            tabIndex={0}
            dir={dir}
            className="relative h-[560px] select-none overflow-hidden touch-pan-y outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4 sm:h-[620px] lg:h-[660px]"
            onKeyDown={handleCarouselKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={finishPointerDrag}
            onPointerCancel={cancelPointerDrag}
            onClickCapture={(event) => {
              if (dragMovedRef.current) {
                event.preventDefault();
                event.stopPropagation();
                dragMovedRef.current = false;
              }
            }}
          >
            <div
              ref={trackRef}
              className={`absolute inset-y-5 left-1/2 flex w-max items-stretch gap-2 md:inset-y-6 md:gap-6 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              style={{
                transform: `translate3d(calc(-50% + ${trackOffset}px), 0, 0)`,
                transition: transitionEnabled && !isDragging
                  ? "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)"
                  : "none",
                touchAction: "pan-y",
              }}
              onTransitionEnd={handleTrackTransitionEnd}
            >
              {trackSlides.map(({ program, logicalIndex, isClone }, slideIndex) => {
                const distance = Math.abs(slideIndex - trackIndex);
                const isActive = distance === 0;
                const isVisible = distance <= 1;
                return (
                  <article
                    key={isClone ? `clone-${slideIndex}` : `program-${logicalIndex}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${program.title} ${logicalIndex + 1} / ${items.length}`}
                    aria-hidden={isClone || !isVisible}
                    className={`group flex h-full w-[70vw] max-w-[620px] flex-none flex-col overflow-hidden rounded-lg border border-sand-200 bg-white shadow-md transition-[transform,opacity,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[min(68vw,520px)] lg:w-[min(48vw,600px)] ${isActive ? "shadow-xl" : ""}`}
                    style={{
                      transform: `scale(${isActive ? 1 : distance === 1 ? 0.88 : 0.8})`,
                      opacity: isActive ? 1 : distance === 1 ? 0.62 : 0.28,
                      transition: transitionEnabled ? undefined : "none",
                    }}
                  >
                    <div className="relative aspect-[16/10] flex-none overflow-hidden">
                      <img
                        src={resolvePublicAsset(program.image)}
                        alt={"imageAlt" in program ? program.imageAlt : program.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/20 to-transparent"
                        aria-hidden
                      />
                      <div className="absolute top-4 start-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-navy-900 backdrop-blur-sm">
                          <Users size={14} className="text-teal-600" />
                          <BiText value={"badge" in program ? program.badge : program.title} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-navy-900 sm:text-2xl">
                        <BiText value={program.title} />
                      </h3>
                      <p className="mb-4 min-h-[4.5em] line-clamp-3 flex-1 text-[15px] leading-relaxed text-navy-600">
                        <BiText value={program.desc} />
                      </p>
                      <div className="flex items-center justify-between gap-3 border-t border-sand-200 pt-4">
                        <div className="flex min-w-0 items-center gap-2">
                          <Award size={18} className="flex-none text-gold-500" />
                          <span className="text-sm font-bold text-navy-900">
                            <BiText value={program.metric} />
                          </span>
                        </div>
                        <button
                          type="button"
                          tabIndex={isClone || !isActive ? -1 : undefined}
                          onClick={() => setProgramIndex(logicalIndex)}
                          className="flex-none text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
                        >
                          <BiText value={program.cta} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              aria-label={t.a11y.previousProgram}
              onClick={() => moveBy(-1)}
              className="absolute start-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sand-200 bg-white text-navy-800 shadow-lg transition-all hover:scale-105 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 md:flex"
            >
              <PreviousIcon size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label={t.a11y.nextProgram}
              onClick={() => moveBy(1)}
              className="absolute end-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-sand-200 bg-white text-navy-800 shadow-lg transition-all hover:scale-105 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 md:flex"
            >
              <NextIcon size={20} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-3 flex justify-center md:hidden">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-2 text-xs font-medium text-teal-700">
              <ArrowLeftRight size={15} aria-hidden="true" />
              {t.a11y.swipePrograms}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2" role="group" aria-label={t.a11y.programPagination}>
            {items.map((program, index) => (
              <button
                key={program.title}
                type="button"
                aria-label={`${t.a11y.goToProgram} ${index + 1}`}
                aria-current={activeSlideIndex === index ? "true" : undefined}
                onClick={() => moveToTrackIndex(cloneCount + index)}
                className={`h-2.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 ${activeSlideIndex === index ? "w-8 bg-teal-600" : "w-2.5 bg-sand-300 hover:bg-teal-300"}`}
              />
            ))}
          </div>
        </div>
      </Reveal>
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
                  src={resolvePublicAsset(story.image)}
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
