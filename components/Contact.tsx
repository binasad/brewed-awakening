"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const details = [
  { label: "Location", value: "123 Roast Avenue, Coffee District" },
  { label: "Hours", value: "Mon - Fri: 7am - 8pm\nSat - Sun: 8am - 9pm" },
  { label: "Phone", value: "+1 (555) 123-4567" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-info-anim > *", {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      });
      gsap.from(".contact-form-anim > *", {
        y: 40, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form-anim", start: "top 70%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-40 px-6 md:px-8 lg:px-16 min-h-screen flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 max-w-[1200px] mx-auto w-full">
        <div className="contact-info-anim">
          <span className="text-xs tracking-[0.4em] uppercase text-gold mb-8 block">Get in Touch</span>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold mb-8">Visit Us Today</h2>
          <p className="text-base leading-[1.8] text-cream/60 mb-8">
            We&apos;d love to welcome you to our space. Drop by for a cup, or reach out below and we&apos;ll get back to you.
          </p>
          {details.map((d) => (
            <div key={d.label} className="mb-6">
              <div className="text-xs tracking-[0.3em] uppercase text-gold mb-2">{d.label}</div>
              <div className="text-base text-cream/80 whitespace-pre-line">{d.value}</div>
            </div>
          ))}
        </div>

        <form className="contact-form-anim flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {[
            { id: "name", label: "Your Name", type: "text" },
            { id: "email", label: "Email Address", type: "email" },
          ].map((f) => (
            <div key={f.id} className="form-group relative">
              <input
                type={f.type}
                id={f.id}
                placeholder=" "
                className="w-full bg-transparent border-b border-gold/20 py-4 text-base text-cream outline-none focus:border-gold transition-colors"
              />
              <label htmlFor={f.id} className="absolute left-0 top-4 text-sm text-cream/40 pointer-events-none transition-all duration-300">
                {f.label}
              </label>
            </div>
          ))}
          <div className="form-group relative">
            <textarea
              id="message"
              placeholder=" "
              className="w-full bg-transparent border-b border-gold/20 py-4 text-base text-cream outline-none focus:border-gold transition-colors resize-none h-[120px]"
            />
            <label htmlFor="message" className="absolute left-0 top-4 text-sm text-cream/40 pointer-events-none transition-all duration-300">
              Your Message
            </label>
          </div>
          <button
            type="submit"
            className="submit-btn self-start bg-transparent border border-gold text-gold px-12 py-4 text-sm tracking-[0.2em] uppercase cursor-pointer relative overflow-hidden hover:text-dark transition-colors duration-400"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
