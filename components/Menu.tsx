"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

gsap.registerPlugin(ScrollTrigger);

const MenuCard3D = dynamic(() => import("./MenuCard3D"), { ssr: false });

const menuItems = [
  {
    name: "Classic Espresso",
    price: "$4.50",
    image: "/images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg",
    desc: "A bold, full-bodied shot pulled from our house blend of Brazilian and Ethiopian beans. Rich crema, notes of dark chocolate and toasted walnut.",
    detail: "Double Shot \u2022 2oz",
  },
  {
    name: "Velvet Latte",
    price: "$5.50",
    image: "/images/fahmi-fakhrudin-nzyzAUsbV0M-unsplash.jpg",
    desc: "Silky steamed milk meets our signature espresso. Topped with latte art crafted by skilled hands. Smooth, creamy, and perfectly balanced.",
    detail: "Milk Choice \u2022 12oz",
  },
  {
    name: "Caramel Macchiato",
    price: "$6.00",
    image: "/images/nathan-dumlao-6VhPY27jdps-unsplash.jpg",
    desc: "Layers of vanilla-infused milk, bold espresso, and house-made caramel drizzle. A sweet symphony in every sip that keeps you coming back.",
    detail: "Hot or Iced \u2022 16oz",
  },
];

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".menu-header-anim", {
        y: 60, opacity: 0, duration: 1,
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%", toggleActions: "play none none none" },
      });
      gsap.from(".menu-card-anim", {
        y: 80, opacity: 0, stagger: 0.2, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: ".menu-grid-anim", start: "top 70%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="relative py-20 md:py-40 px-6 md:px-8 lg:px-16 min-h-screen bg-dark-light">
      <div className="menu-header-anim text-center max-w-[600px] mx-auto mb-12 md:mb-24">
        <span className="text-xs tracking-[0.4em] uppercase text-gold mb-4 block">The Menu</span>
        <h2 className="font-heading text-[clamp(2rem,4vw,3.5rem)] font-bold mb-4">Our Signature Drinks</h2>
        <p className="text-base text-cream/50 leading-relaxed">Hover to discover the story behind each brew</p>
      </div>

      <div className="menu-grid-anim grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
        {menuItems.map((item) => (
          <div key={item.name} className="menu-card-anim">
            <MenuCard3D image={item.image} name={item.name} price={item.price} desc={item.desc} detail={item.detail} />
            <div className="text-center mt-4">
              <p className="text-sm text-cream/50 leading-relaxed max-w-[280px] mx-auto">{item.desc}</p>
              <span className="text-xs tracking-wider uppercase text-cream/30 mt-2 block">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
