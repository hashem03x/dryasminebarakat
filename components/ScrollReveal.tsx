"use client";

import { useEffect, useRef } from "react";

// Content is visible by default (server-rendered and on first client paint,
// no CSS rule ever hides it statically). Only after mount do we check
// whether an element starts off-screen; if so, and only once an
// IntersectionObserver is confirmed available, we hide it imperatively and
// animate it back in on scroll. Any failure along the way — no
// IntersectionObserver support, a thrown error, JS not running at all —
// simply leaves the content in its default visible state.
export default function ScrollReveal({
  children,
  className,
  delayMs = 0,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const rect = node.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (alreadyVisible) return;

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              node.style.opacity = "";
              node.style.transform = "";
              node.style.animationDelay = `${delayMs}ms`;
              node.classList.add("animate-fade-up");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
    } catch {
      return;
    }

    node.style.opacity = "0";
    node.style.transform = "translateY(14px)";
    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} id={id} className={className}>
      {children}
    </div>
  );
}
