"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { src: "/images/pt2.jpeg", title: "Warm Interiors", sub: "Where comfort meets elegance" },
  { src: "/images/fahmi-fakhrudin-nzyzAUsbV0M-unsplash.jpg", title: "The Pour", sub: "Milk meets espresso" },
  { src: "/images/nathan-dumlao-6VhPY27jdps-unsplash.jpg", title: "Together", sub: "Shared moments, better sips" },
  { src: "/images/nathan-dumlao-Y3AqmbmtLQI-unsplash.jpg", title: "Bean to Cup", sub: "The journey of every brew" },
  { src: "/images/ante-samarzija-lsmu0rUhUOk-unsplash.jpg", title: "The Drama", sub: "Bold flavors, bold moments" },
  { src: "/images/nathan-dumlao-zUNs99PGDg0-unsplash.jpg", title: "Nature & Brew", sub: "Green vibes, golden cups" },
  { src: "/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg", title: "Up Close", sub: "Every detail matters" },
];

export default function Atmosphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".atm-header", {
        y: 60, opacity: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      });

      const track = trackRef.current;
      if (!track) return;
      const trackWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -trackWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + trackWidth,
          pin: true,
          scrub: 2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="atmosphere" ref={sectionRef} className="relative pt-16 overflow-visible">
      <div className="atm-header text-center px-6 md:px-8 lg:px-16 mb-8 md:mb-10">
        <span className="text-xs tracking-[0.4em] uppercase text-gold mb-4 block">The Space</span>
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold mb-4">Feel the Atmosphere</h2>
        <p className="text-base text-cream/50">Scroll to explore our world</p>
      </div>

      <div ref={trackRef} className="flex gap-4 md:gap-8 px-4 md:px-8 lg:px-16 w-max">
        {galleryItems.map((item) => (
          <div key={item.title} className="w-[260px] md:w-[350px] lg:w-[450px] h-[calc(100vh-220px)] md:h-[calc(100vh-280px)] rounded-xl overflow-hidden relative flex-shrink-0 group">
            <Image
              src={item.src}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-dark/80 to-transparent">
              <h4 className="font-heading text-base md:text-xl">{item.title}</h4>
              <p className="text-xs md:text-sm text-cream/60 mt-1">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
