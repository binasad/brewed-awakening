"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { count: 12, label: "Years of Craft" },
  { count: 30, label: "Bean Origins" },
  { count: 50000, label: "Cups Served" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states explicitly
      gsap.set(".about-main-img-wrap", { x: -200, rotate: -12, opacity: 0, scale: 0.85 });
      gsap.set(".about-decor", { x: 200, rotate: 15, opacity: 0, scale: 0.85 });
      gsap.set(".about-label", { y: 30, opacity: 0 });
      gsap.set(".about-heading", { y: 50, opacity: 0 });

      // Main image flies in from left with rotation
      const imgTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });

      imgTl.to(".about-main-img-wrap", {
        x: 0, rotate: 0, opacity: 1, scale: 1,
        duration: 1.4, ease: "power3.out",
      })
      // Decor image flies in from right with rotation, slightly delayed
      .to(".about-decor", {
        x: 0, rotate: 0, opacity: 1, scale: 1,
        duration: 1.2, ease: "power3.out",
      }, "-=0.8");

      // Text
      gsap.to(".about-label", {
        y: 0, opacity: 1, duration: 0.8,
        scrollTrigger: { trigger: section, start: "top 80%", once: true },
      });
      gsap.to(".about-heading", {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      // Word-by-word
      section.querySelectorAll<HTMLElement>("[data-animate-words]").forEach((p) => {
        const text = p.textContent || "";
        p.innerHTML = text.split(" ").map((w) => `<span class="inline-block mr-[0.3em]">${w}</span>`).join("");
        const spans = p.querySelectorAll("span");
        gsap.set(spans, { opacity: 0, y: 10 });
        gsap.to(spans, {
          opacity: 1, y: 0, stagger: 0.02, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: p, start: "top 90%", once: true },
        });
      });

      // Counter
      section.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const target = parseInt(el.dataset.count || "0");
        gsap.to(el, {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
          onUpdate() {
            const val = Math.round(parseFloat(el.innerText));
            el.innerText = val >= 1000 ? val.toLocaleString() + "+" : val + "+";
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-20 md:py-40 px-6 md:px-8 lg:px-16 min-h-screen flex items-center overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-[1400px] mx-auto w-full items-center">
        {/* Image Column */}
        <div className="relative">
          <div ref={mainImgRef} className="about-main-img-wrap relative overflow-hidden rounded-lg will-change-transform">
            <Image
              src="/images/nathan-dumlao-zEdCT0qrodE-unsplash.jpg"
              alt="Cafe atmosphere"
              width={800}
              height={600}
              className="w-full h-[280px] md:h-[400px] lg:h-[600px] object-cover"
            />
          </div>
          <div className="about-decor absolute w-[100px] md:w-[150px] lg:w-[200px] right-[-15px] md:right-[-30px] lg:right-[-60px] bottom-[-15px] md:bottom-[-30px] lg:bottom-[-60px] rounded-lg overflow-hidden shadow-2xl will-change-transform">
            <Image
              src="/images/nathan-dumlao-Y3AqmbmtLQI-unsplash.jpg"
              alt="Bean to cup"
              width={400}
              height={400}
              className="w-full"
            />
          </div>
        </div>

        {/* Text Column */}
        <div className="lg:pl-8">
          <span className="about-label text-xs tracking-[0.4em] uppercase text-gold mb-8 inline-block">Our Story</span>
          <h2 className="about-heading font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.15] mb-8">
            Crafted with Passion, Served with Love
          </h2>
          <p data-animate-words className="text-base leading-[1.8] text-cream/60 mb-6">
            We believe great coffee is an art form. Each cup we serve is a testament to our dedication to sourcing the finest beans, roasting them to perfection, and crafting beverages that awaken your senses. From our carefully curated single-origin selections to our signature blends, every detail matters.
          </p>
          <p data-animate-words className="text-base leading-[1.8] text-cream/60 mb-6">
            Step into our space and feel the warmth of a community built around the love of exceptional coffee. This is more than a cafe. This is your second home.
          </p>
          <div className="flex gap-6 md:gap-8 lg:gap-12 mt-8 md:mt-12 pt-8 md:pt-12 border-t border-gold/15">
            {stats.map((s) => (
              <div key={s.label}>
                <div data-count={s.count} className="font-heading text-[1.8rem] md:text-[2.5rem] font-bold text-gold">0</div>
                <div className="text-[0.65rem] md:text-xs tracking-wider text-cream/50 mt-1 md:mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
