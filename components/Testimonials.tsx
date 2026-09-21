"use client";

import { useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";
import { SECTION_ID } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

const SWIPE_THRESHOLD_RATIO = 0.18;
const SWIPE_THRESHOLD_MIN_PX = 48;

export default function Testimonials({ locale, messages }: { locale: Locale; messages: Messages }) {
  const items = messages.testimonials.items;
  const isRTL = locale === "ar";
  const baseId = useId();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPx, setDragPx] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const pointerId = useRef<number | null>(null);

  function clamp(index: number) {
    return Math.max(0, Math.min(items.length - 1, index));
  }

  function goTo(index: number) {
    setActiveIndex(clamp(index));
  }

  // Reading-order navigation — used by the labeled Previous/Next buttons.
  function goPrev() {
    goTo(activeIndex - 1);
  }
  function goNext() {
    goTo(activeIndex + 1);
  }

  // Screen-space navigation — a physical rightward gesture (arrow key or
  // drag) always reveals whatever sits visually to the right, which is the
  // previous slide in LTR but the next slide in RTL (flex-row reverses
  // visual slide order under dir="rtl").
  function revealFromRight() {
    goTo(activeIndex + (isRTL ? 1 : -1));
  }
  function revealFromLeft() {
    goTo(activeIndex + (isRTL ? -1 : 1));
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      revealFromRight();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      revealFromLeft();
    } else if (event.key === "Home") {
      event.preventDefault();
      goTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      goTo(items.length - 1);
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (items.length < 2) return;
    pointerId.current = event.pointerId;
    dragStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerId.current !== event.pointerId) return;
    setDragPx(event.clientX - dragStartX.current);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (pointerId.current !== event.pointerId) return;
    const width = viewportRef.current?.offsetWidth ?? 320;
    const threshold = Math.max(SWIPE_THRESHOLD_MIN_PX, width * SWIPE_THRESHOLD_RATIO);

    if (dragPx > threshold) revealFromRight();
    else if (dragPx < -threshold) revealFromLeft();

    pointerId.current = null;
    setIsDragging(false);
    setDragPx(0);
  }

  const trackWidthPercent = items.length * 100;
  const slideWidthPercent = 100 / items.length;
  const mult = isRTL ? -1 : 1;
  const basePercent = mult * activeIndex * -slideWidthPercent;

  return (
    <section id={SECTION_ID.testimonials} className="section-space overflow-hidden bg-ink text-ivory">
      <div className="container-edit">
        <ScrollReveal>
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.15em] text-sage-light">
            <span className="h-px w-8 bg-sage-light" aria-hidden="true" />
            {messages.testimonials.eyebrow}
          </p>
          <h2 className="max-w-2xl text-display-sm font-display font-semibold text-white">
            {messages.testimonials.title}
          </h2>
        </ScrollReveal>

        {items.length > 0 && (
          <ScrollReveal delayMs={120} className="mt-14">
            <div
              className="mx-auto max-w-3xl"
              role="region"
              aria-roledescription="carousel"
              aria-label={messages.testimonials.title}
            >
              <div
                ref={viewportRef}
                className="touch-pan-y select-none overflow-hidden"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                style={{ cursor: items.length > 1 ? (isDragging ? "grabbing" : "grab") : undefined }}
              >
                <div
                  className={isDragging ? "flex" : "flex transition-transform duration-500 ease-editorial"}
                  style={{
                    width: `${trackWidthPercent}%`,
                    transform: `translateX(calc(${basePercent}% + ${isDragging ? dragPx : 0}px))`,
                  }}
                >
                  {items.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div
                        key={item.name + index}
                        id={`${baseId}-slide-${index}`}
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} / ${items.length}`}
                        aria-hidden={!isActive}
                        style={{ width: `${slideWidthPercent}%` }}
                        className="shrink-0 px-1"
                      >
                        <Quote className="h-9 w-9 text-sage-light" aria-hidden="true" />
                        <p className="mt-6 font-display text-2xl leading-snug text-ivory/95 sm:text-3xl">
                          {item.quote}
                        </p>
                        <p className="mt-6 text-sm font-medium uppercase tracking-wide text-ivory/60">
                          {item.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {items.length > 1 && (
                <div className="mt-10 flex items-center justify-between gap-6">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={activeIndex === 0}
                    aria-label={messages.testimonials.previous}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-200 hover:border-sage-light hover:text-sage-light disabled:opacity-30 disabled:hover:border-ivory/25 disabled:hover:text-ivory"
                  >
                    {isRTL ? (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>

                  <div className="flex items-center gap-2">
                    {items.map((item, index) => (
                      <button
                        key={item.name + index}
                        type="button"
                        onClick={() => goTo(index)}
                        aria-label={`${messages.testimonials.goToItem} ${index + 1}`}
                        aria-current={index === activeIndex ? "true" : undefined}
                        aria-controls={`${baseId}-slide-${index}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ease-editorial ${
                          index === activeIndex ? "w-6 bg-sage-light" : "w-1.5 bg-ivory/25 hover:bg-ivory/50"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={activeIndex === items.length - 1}
                    aria-label={messages.testimonials.next}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors duration-200 hover:border-sage-light hover:text-sage-light disabled:opacity-30 disabled:hover:border-ivory/25 disabled:hover:text-ivory"
                  >
                    {isRTL ? (
                      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
