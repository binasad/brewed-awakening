"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const heroImages = [
  "/images/nathan-dumlao-6VhPY27jdps-unsplash.jpg",
  "/images/ante-samarzija-lsmu0rUhUOk-unsplash.jpg",
  "/images/fahmi-fakhrudin-nzyzAUsbV0M-unsplash.jpg",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const revealStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const content = contentRef.current;
    const videoWrap = videoWrapRef.current;
    const overlay = overlayRef.current;
    if (!section || !video || !content || !videoWrap || !overlay) return;

    const ctx = gsap.context(() => {
      // --- Intro animations ---
      const tl = gsap.timeline();
      tl.set(".hero-char", { y: "110%", opacity: 0 });
      tl.set(".hero-subtitle", { opacity: 0, y: 20 });
      tl.set(".hero-tagline", { opacity: 0, y: 20 });
      tl.set(".hero-divider", { scaleX: 0 });
      tl.set(".hero-photo-reveal", { clipPath: "inset(100% 0 0 0)" });

      tl.to(".hero-char", {
        y: "0%",
        opacity: 1,
        duration: 1.4,
        stagger: 0.04,
        ease: "power4.out",
      })
        .to(".hero-divider", {
          scaleX: 1,
          duration: 1,
          ease: "power2.inOut",
        }, "-=0.8")
        .to(".hero-subtitle", {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }, "-=0.6")
        .to(".hero-tagline", {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }, "-=0.4")
        .to(scrollIndRef.current, {
          opacity: 1, duration: 0.6, ease: "power2.out",
        }, "-=0.2");

      // --- Video scrub ---
      const setupVideo = () => {
        video.pause();
        video.currentTime = 0;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (video.duration) {
              video.currentTime = self.progress * video.duration;
            }
          },
        });
      };

      video.play().then(setupVideo).catch(() => {
        video.muted = true;
        video.play().then(setupVideo);
      });

      // --- Cinematic zoom on scroll ---
      gsap.to(videoWrap, {
        scale: 1.3,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "60% top",
          scrub: 2,
        },
      });

      // --- Vignette intensifies on scroll ---
      gsap.to(overlay, {
        background: "radial-gradient(ellipse at center, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.85) 70%)",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
      });

      // --- Title chars fly out individually ---
      gsap.to(".hero-char", {
        y: (i) => -150 - i * 30,
        opacity: 0,
        rotateX: -45,
        stagger: 0.02,
        scrollTrigger: {
          trigger: section,
          start: "12% top",
          end: "35% top",
          scrub: 1.5,
        },
      });

      // --- Subtitle and tagline parallax out ---
      gsap.to(".hero-subtitle", {
        y: -200,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "30% top",
          scrub: 1,
        },
      });

      gsap.to(".hero-tagline", {
        y: -120,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "12% top",
          end: "32% top",
          scrub: 1,
        },
      });

      gsap.to(".hero-divider", {
        scaleX: 0,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "10% top",
          end: "25% top",
          scrub: 1,
        },
      });

      // --- Photo reveals on scroll ---
      gsap.to(".hero-photo-reveal", {
        clipPath: "inset(0% 0 0 0)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "35% top",
          end: "65% top",
          scrub: 1.5,
        },
      });

      // Photo parallax movement
      gsap.utils.toArray<HTMLElement>(".hero-photo-reveal").forEach((photo, i) => {
        gsap.to(photo, {
          y: (i % 2 === 0) ? -60 : 40,
          scale: 1.05,
          scrollTrigger: {
            trigger: section,
            start: "40% top",
            end: "75% top",
            scrub: 2,
          },
        });
      });

      // --- Photo fade out at end ---
      gsap.to(".hero-photo-reveal", {
        opacity: 0,
        y: -100,
        stagger: 0.05,
        scrollTrigger: {
          trigger: section,
          start: "70% top",
          end: "90% top",
          scrub: 1,
        },
      });

      // --- Reveal strip text ---
      gsap.fromTo(".reveal-strip-text", {
        x: "100%",
        opacity: 0,
      }, {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "45% top",
          end: "60% top",
          scrub: 1.5,
        },
      });

      gsap.to(".reveal-strip-text", {
        x: "-100%",
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "70% top",
          end: "85% top",
          scrub: 1,
        },
      });

      // --- Scroll indicator ---
      gsap.to(scrollIndRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "3% top",
          end: "10% top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Split text into individual characters
  const renderChars = (text: string) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        className="hero-char inline-block"
        style={{ perspective: "600px" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section id="hero" ref={sectionRef} className="relative h-[350vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video layer */}
        <div ref={videoWrapRef} className="absolute inset-0 will-change-transform origin-center">
          <video
            ref={videoRef}
            src="/video/Steaming_latte_cup_cafe_table_delpmaspu_.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cinematic vignette overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[5]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(10,10,10,0) 0%, rgba(10,10,10,0.5) 70%)",
          }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-[6] bg-gradient-to-b from-dark/40 via-transparent to-dark/70" />

        {/* 3D Particles */}
        <div className="z-[7]">
          <HeroScene />
        </div>

        {/* Main text content */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-[15]"
        >
          <p className="hero-subtitle text-[clamp(0.6rem,1.1vw,0.9rem)] tracking-[0.2em] md:tracking-[0.5em] uppercase text-gold mb-4 md:mb-6 font-light">
            Artisan Coffee Experience
          </p>

          <h1 className="font-heading text-[clamp(3rem,9vw,8rem)] font-bold leading-[1.0] hero-title">
            <span className="block overflow-hidden pb-2">
              {renderChars("Brewed")}
            </span>
            <span className="block overflow-hidden pb-2">
              {renderChars("Awakening")}
            </span>
          </h1>

          <div className="hero-divider w-[80px] h-[1px] bg-gold my-6 origin-center" />

          <p className="hero-tagline text-[clamp(0.75rem,1.3vw,1rem)] font-light tracking-[0.08em] md:tracking-[0.15em] text-cream/60 max-w-md px-4 md:px-0">
            Where every sip tells a story
          </p>
        </div>

        {/* Floating photo reveals (appear on scroll) */}
        <div className="absolute inset-0 z-[12] pointer-events-none">
          {/* Top-left photo */}
          <div
            className="hero-photo-reveal absolute top-[8%] left-[3%] md:left-[5%] w-[40vw] md:w-[28vw] max-w-[320px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <Image
              src={heroImages[0]}
              alt="Coffee art"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40vw, 28vw"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
          </div>

          {/* Center-right photo */}
          <div
            className="hero-photo-reveal absolute top-[20%] right-[3%] md:right-[6%] w-[35vw] md:w-[22vw] max-w-[260px] aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <Image
              src={heroImages[1]}
              alt="Cafe atmosphere"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 35vw, 22vw"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
          </div>

          {/* Bottom-center photo */}
          <div
            className="hero-photo-reveal absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[55vw] md:w-[30vw] max-w-[350px] aspect-[16/10] rounded-sm overflow-hidden shadow-2xl"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <Image
              src={heroImages[2]}
              alt="Coffee beans"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 55vw, 30vw"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
          </div>
        </div>

        {/* Horizontal reveal strip text */}
        <div ref={revealStripRef} className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-[13] pointer-events-none overflow-hidden">
          <p className="reveal-strip-text text-[clamp(0.8rem,2.5vw,2rem)] tracking-[0.3em] md:tracking-[0.6em] uppercase text-gold/80 text-center font-heading font-light">
            Crafted with Passion
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-[20]"
        >
          <span className="text-[0.65rem] tracking-[0.4em] uppercase text-cream/40 font-light">
            Scroll
          </span>
          <div className="scroll-line w-[1px] h-[50px] bg-gradient-to-b from-gold/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}
