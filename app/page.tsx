"use client";
import { useState, useCallback } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Atmosphere from "@/components/Atmosphere";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onLoaded = useCallback(() => setLoaded(true), []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Loader onComplete={onLoaded} />
      {loaded && <Navbar />}
      <main>
        <Hero />
        <About />
        <Menu />
        <Atmosphere />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
