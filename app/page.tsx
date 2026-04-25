"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FadeUp } from "@/components/FadeUp";

type MenuItem = {
  name: string;
  type: "v" | "nv";
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "Reels", href: "#reels" },
  { label: "Visit Us", href: "#visit" },
];

const specialties = [
  {
    id: "specialty-1",
    image: "/images/IMG_8617.PNG",
  },
  {
    id: "specialty-2",
    image: "/images/IMG_8624.PNG",
  },
  {
    id: "specialty-3",
    image: "/images/IMG_8620.PNG",
  },
];

const reels = [
  "/videos/IMG_8610.MP4",
  "/videos/IMG_8611.MP4",
  "/videos/IMG_8612.MP4",
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const menuData: Record<string, MenuItem[]> = {
  WRAPS: [
    { name: "Fried Chicken Wrap", type: "nv" },
    { name: "Zinger Wrap", type: "nv" },
    { name: "Chicken Oriental Wrap", type: "nv" },
    { name: "Chicken Frankie Wrap", type: "nv" },
    { name: "Egg Lays Wrap", type: "nv" },
    { name: "Spiced Paneer Wrap", type: "v" },
    { name: "Veggie Munch Wrap", type: "v" },
    { name: "Paneer Tawa Frankie", type: "v" },
    { name: "Chicken Smash Wrap", type: "nv" },
  ],
  BURGERS: [
    { name: "Double Smash Burger", type: "nv" },
    { name: "Chicken Smashburger", type: "nv" },
    { name: "Smoked Paprika Burger", type: "nv" },
    { name: "Cheese Loaded Burger", type: "nv" },
    { name: "Chicken Zinger Burger", type: "nv" },
    { name: "Chicken Fusion Burger", type: "nv" },
    { name: "Chicken Patty Burger", type: "nv" },
    { name: "Egg Tawa Burger", type: "nv" },
    { name: "Paneer Burger", type: "v" },
    { name: "Veg Burger", type: "v" },
  ],
  "CHEESE SPECIALS (NON-VEG)": [
    { name: "Chicken Cookies", type: "nv" },
    { name: "Wheelz Loaded Fries", type: "nv" },
    { name: "Chicken Cheese Roll", type: "nv" },
    { name: "Chicken Cheese Popsicle", type: "nv" },
    { name: "Chicken Cheese Samosa", type: "nv" },
    { name: "Chicken Cheese Twist", type: "nv" },
    { name: "Chicken Cheese Ball", type: "nv" },
  ],
  "NON-VEG STARTERS": [
    { name: "Chicken Donut", type: "nv" },
    { name: "Chicken Popsicles", type: "nv" },
    { name: "Chicken Zinger Popcorn", type: "nv" },
    { name: "Chicken Popcorn", type: "nv" },
    { name: "Chicken Twist", type: "nv" },
    { name: "Chicken Spring Samosa", type: "nv" },
    { name: "Chicken Nugget", type: "nv" },
  ],
  "CHEESE SPECIALS (VEG)": [
    { name: "Potato Cheese Ball", type: "v" },
    { name: "Potato Cheese Roll", type: "v" },
    { name: "Cheezy Fries", type: "v" },
    { name: "Potato Cheese Samosa", type: "v" },
  ],
  "PANEER STARTERS": [
    { name: "Paneer Popcorn", type: "v" },
    { name: "Paneer Kurkure", type: "v" },
    { name: "Paneer Spring Samosa", type: "v" },
  ],
  "VEG STARTERS": [
    { name: "French Fries", type: "v" },
    { name: "Potato Nugget", type: "v" },
    { name: "Potato Spring Samosa", type: "v" },
    { name: "Potato Popcorns", type: "v" },
  ],
};

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT },
  },
};

const buttonTransition = { type: "spring", stiffness: 400, damping: 22 } as const;
const cardTransition = { type: "spring", stiffness: 280, damping: 18 } as const;

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ReelVideoCard({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const playPromise = el.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay can be blocked in some environments; attributes still allow user-initiated play.
      });
    }
  }, []);

  return (
    <motion.div
      className="aspect-[9/16] rounded-2xl overflow-hidden mx-auto w-full max-w-xs md:max-w-none"
      variants={staggerItem}
      whileHover={{ y: -6 }}
      transition={cardTransition}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M12 21C12 21 18 15.4 18 10.7C18 7.1 15.3 4.5 12 4.5C8.7 4.5 6 7.1 6 10.7C6 15.4 12 21 12 21Z" stroke="#F5C518" strokeWidth="1.8" />
      <circle cx="12" cy="10.7" r="2.2" fill="#F5C518" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="#F5C518" strokeWidth="1.8" />
      <path d="M12 8.5V12.5L14.8 14.2" stroke="#F5C518" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="6" width="18" height="14" rx="3" stroke="#F5C518" strokeWidth="1.8" />
      <circle cx="12" cy="13" r="3.2" stroke="#F5C518" strokeWidth="1.8" />
      <circle cx="17" cy="9" r="1" fill="#F5C518" />
    </svg>
  );
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof menuData>("WRAPS");
  const [heroThreshold, setHeroThreshold] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const chevronOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  useEffect(() => {
    const updateHeroThreshold = () => {
      const heroHeight = heroRef.current?.offsetHeight ?? window.innerHeight;
      setHeroThreshold(Math.max(0, heroHeight - 64));
    };

    updateHeroThreshold();
    window.addEventListener("resize", updateHeroThreshold);

    let observer: ResizeObserver | null = null;
    if (heroRef.current && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateHeroThreshold);
      observer.observe(heroRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeroThreshold);
      if (observer) observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsScrolled(scrollY.get() >= heroThreshold);
  }, [heroThreshold, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest >= heroThreshold);
  });

  return (
    <main className="bg-mist text-midnight">
      <motion.nav
        className="fixed top-0 z-50 w-full h-16"
        animate={{
          backgroundColor: isScrolled ? "rgba(25, 25, 112, 0.94)" : "transparent",
          backdropFilter: isScrolled ? "blur(14px)" : "none",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
          <a
            href="#home"
            className="text-white"
            style={{ fontFamily: "var(--font-dm-serif)", fontSize: "1.125rem", letterSpacing: "0.04em" }}
          >
            WHEELZ CAFE
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link uppercase text-[0.8125rem] font-semibold tracking-[0.1em] text-[rgba(255,255,255,0.8)] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-midnight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-end">
              <button className="text-white" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="h-[calc(100%-64px)] flex flex-col justify-center items-center gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white"
                  style={{ fontFamily: "var(--font-dm-serif)", fontSize: "2rem" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="home" ref={heroRef} className="relative h-screen min-h-[680px] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            y: bgY,
            backgroundImage: "url('/images/herowz.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(25,25,112,0.62) 0%, rgba(13,13,43,0.88) 100%)",
          }}
        />

        <motion.div style={{ opacity: heroOpacity }} className="absolute inset-0">
          <div className="max-w-6xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <FadeUp>
              <p className="uppercase text-gold text-[0.75rem] font-semibold tracking-[0.14em]">
                NEWTOWN · KOLKATA
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <h1
                className="mt-4 text-white"
                style={{
                  fontSize: "clamp(2.25rem, 10vw, 5.75rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                WHEELZ CAFE
              </h1>
            </FadeUp>

            <FadeUp delay={0.28}>
              <p className="mt-5 text-base md:text-xl font-normal text-[rgba(255,255,255,0.75)]">
                Bold Flavors. Street Soul.
              </p>
            </FadeUp>

            <FadeUp delay={0.42}>
              <motion.a
                href="#menu"
                className="mt-10 inline-flex w-full sm:w-auto rounded-full bg-gold px-9 py-4 text-midnight uppercase"
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  boxShadow: "0 8px 36px rgba(245,197,24,0.38)",
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={buttonTransition}
              >
                Explore Our Menu
              </motion.a>
            </FadeUp>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: chevronOpacity }}
          className="chevron-bounce absolute bottom-8 left-1/2 text-[rgba(255,255,255,0.6)]"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" aria-hidden="true">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </motion.div>
      </section>

      <section id="serve" className="bg-white py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-xl mx-auto">
            <p className="text-gold text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3">OUR SPECIALTIES</p>
            <h2 className="text-midnight" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", letterSpacing: "-0.015em" }}>
              What We Serve
            </h2>
            <p className="mt-4 text-muted">
              From crispy wraps to loaded burgers - every bite is crafted with street soul.
            </p>
          </FadeUp>

          <FadeUp className="mt-14">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-64px" }}
            >
              {specialties.map((item) => (
                <motion.div
                  key={item.id}
                  className="mx-auto h-[18rem] w-[18rem] rounded-full flex items-center justify-center"
                  variants={staggerItem}
                  whileHover={{ y: -12, scale: 1.04 }}
                  transition={cardTransition}
                >
                  <img
                    src={item.image}
                    alt="Wheelz Cafe specialty"
                    className="h-[92%] w-[92%] object-contain"
                    style={item.id === "specialty-3" ? { transform: "scale(1.4)", transformOrigin: "center center" } : undefined}
                  />
                </motion.div>
              ))}
            </motion.div>
          </FadeUp>
        </div>
      </section>

      <section id="reels" className="bg-midnight py-16 md:py-28 border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-lg mx-auto">
            <p className="text-gold text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3">FOLLOW ALONG</p>
            <h2 className="text-white" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", letterSpacing: "-0.015em" }}>
              Catch Our Reels
            </h2>
            <p className="mt-4 text-[rgba(255,255,255,0.65)]">
              Follow us @wheelz_cafe for daily drops and behind-the-scenes
            </p>
          </FadeUp>

          <FadeUp className="mt-14">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-64px" }}
            >
              {reels.map((src) => (
                <ReelVideoCard key={src} src={src} />
              ))}
            </motion.div>
          </FadeUp>
        </div>
      </section>

      <section id="menu" className="bg-mist py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-md mx-auto">
            <p className="text-gold text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3">EXPLORE</p>
            <h2 className="text-midnight" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", letterSpacing: "-0.015em" }}>
              Our Menu
            </h2>
            <p className="mt-4 text-muted">Handcrafted with bold flavors - pick your favorite.</p>
          </FadeUp>

          <FadeUp className="mt-12">
            <div className="overflow-x-auto hide-scrollbar pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="mx-auto w-max flex gap-2">
                {(Object.keys(menuData) as Array<keyof typeof menuData>).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex-shrink-0 rounded-full px-5 py-2.5 uppercase text-[0.8125rem] font-semibold tracking-[0.08em] border ${
                      activeTab === tab ? "border-transparent" : "border-[rgba(25,25,112,0.15)]"
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-midnight"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    )}
                    <span className={`relative z-10 ${activeTab === tab ? "text-white" : "text-[rgba(25,25,112,0.55)]"}`}>
                      {tab}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          <FadeUp className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="overflow-hidden"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24, transition: { duration: 0.18 } }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="show"
                >
                  {menuData[activeTab].map((item) => (
                    <motion.div
                      key={item.name}
                      className="bg-white rounded-xl px-4 py-3"
                      style={{ boxShadow: "0 2px 8px rgba(25,25,112,0.06)", border: "1px solid transparent" }}
                      variants={staggerItem}
                      whileHover={{
                        borderColor: "rgba(25,25,112,0.18)",
                        y: -2,
                        boxShadow: "0 6px 18px rgba(25,25,112,0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: item.type === "v" ? "#22C55E" : "#EF4444" }}
                        />
                        <span className="text-midnight text-[0.9375rem] leading-[1.5]">{item.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </FadeUp>
        </div>
      </section>

      <section className="bg-midnight py-16 md:py-28 border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <FadeUp x={-64} className="text-center md:text-left">
            <div className="mx-auto md:mx-0 w-48 h-48 md:w-64 md:h-64 rounded-full p-1 border-4 border-gold" style={{ boxShadow: "0 0 0 8px rgba(245,197,24,0.12)" }}>
              <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #191970 0%, #0D0D2B 100%)" }}>
                <img
                  src="https://i.ibb.co/q3SfYyTW/649302101-17869551198571349-202994763254197813-n-2.jpg"
                  alt="Animesh Saha"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="text-center">
              <motion.a
                href="https://www.instagram.com/pov_tubai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-white border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.07)] text-[0.875rem]"
                whileHover={{ borderColor: "#F5C518", color: "#F5C518", backgroundColor: "rgba(245,197,24,0.08)" }}
                transition={{ duration: 0.2 }}
              >
                <InstagramIcon className="w-4 h-4" />
                @pov_tubai
              </motion.a>
              <p className="text-[0.75rem] text-[rgba(255,255,255,0.3)] text-center mt-3 hidden md:block">
                Behind-the-scenes · Reels · The real story
              </p>
            </div>
          </FadeUp>

          <FadeUp x={64}>
            <p className="text-gold text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3">THE MIND BEHIND THE CART</p>
            <h2 className="text-white" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", letterSpacing: "-0.015em" }}>
              Meet the Founder
            </h2>
            <p className="mt-2 text-gold text-[1.75rem]" style={{ fontFamily: "var(--font-dm-serif)" }}>
              Animesh Saha
            </p>
            <p className="mt-2 mb-6 text-[0.875rem] italic text-[rgba(255,255,255,0.55)] tracking-[0.06em]">Not a Chef — An Artist with Flavours</p>
            <div className="w-14 h-0.5 bg-gold rounded-full mt-5 mb-7" />
            <p className="text-[rgba(255,255,255,0.72)]">
              Animesh didn&apos;t follow a rulebook — he wrote his own. What began as a deep obsession with bold street food turned into Wheelz Cafe, New Town&apos;s most talked-about food cart. Every single item on the menu was born in his kitchen, tested, failed, rebuilt, and perfected until it felt exactly right.
            </p>
            <p className="mt-4 text-[rgba(255,255,255,0.72)]">
              He runs the cart, creates the recipes, and documents the entire raw journey on Instagram — the late nights, the experiments, the behind-the-scenes chaos that most founders hide. For Animesh, the story is just as important as the food.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <motion.div
                className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.15)] rounded-full px-4 py-2 text-[0.8125rem] text-[rgba(255,255,255,0.7)]"
                whileHover={{ borderColor: "#F5C518", color: "white", backgroundColor: "rgba(245,197,24,0.08)" }}
                transition={{ duration: 0.2 }}
              >
                🔥 100% Recipes from Scratch
              </motion.div>
              <motion.div
                className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.15)] rounded-full px-4 py-2 text-[0.8125rem] text-[rgba(255,255,255,0.7)]"
                whileHover={{ borderColor: "#F5C518", color: "white", backgroundColor: "rgba(245,197,24,0.08)" }}
                transition={{ duration: 0.2 }}
              >
                🎬 Behind the Scenes on Instagram
              </motion.div>
              <motion.div
                className="bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.15)] rounded-full px-4 py-2 text-[0.8125rem] text-[rgba(255,255,255,0.7)]"
                whileHover={{ borderColor: "#F5C518", color: "white", backgroundColor: "rgba(245,197,24,0.08)" }}
                transition={{ duration: 0.2 }}
              >
                📍 New Town, Kolkata
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section id="visit" className="bg-mist py-16 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeUp className="text-center max-w-sm mx-auto mb-14">
            <p className="text-gold text-[0.75rem] font-semibold uppercase tracking-[0.12em] mb-3">FIND US</p>
            <h2 className="text-midnight" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)", letterSpacing: "-0.015em" }}>
              Visit Us
            </h2>
            <p className="mt-4 text-muted">Come find us, grab a bite, and taste the difference.</p>
          </FadeUp>

          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            <FadeUp delay={0.1} className="w-full md:w-1/2 flex flex-col">
              <div
                className="flex-1 h-full w-full h-full min-h-[520px] rounded-2xl overflow-hidden shadow-lg border border-[rgba(25,25,112,0.1)]"
              >
                <iframe
                  src="https://maps.google.com/maps?q=Wheelz+Cafe+Gate+4%2F6+Sree+Ram+Mandir+Rd+near+Eco+Park+Action+Area+II+New+Town+Kolkata+West+Bengal+700157+India&t=m&z=17&ie=UTF8&iwloc=near&output=embed"
                  width="100%"
                  height="100%"
                  style={{ minHeight: "520px", border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wheelz Cafe Location"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.2} className="w-full md:w-1/2">
              <div className="bg-midnight rounded-3xl p-6 md:p-8 border border-[rgba(255,255,255,0.06)] h-full">
                <div className="flex items-start gap-4 py-5 border-b border-[rgba(255,255,255,0.08)]">
                  <PinIcon />
                  <div>
                    <p className="text-gold text-[0.75rem] uppercase tracking-[0.12em] mb-1">ADDRESS</p>
                    <p className="text-[0.9375rem] text-[rgba(255,255,255,0.8)] leading-[1.6]">
                      Gate 4/6, Sree Ram Mandir Rd
                      <br />
                      Near Eco Park, opposite Ram Mandir Rd
                      <br />
                      Action Area II, New Town
                      <br />
                      Kolkata, West Bengal 700157
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5 border-b border-[rgba(255,255,255,0.08)]">
                  <ClockIcon />
                  <div>
                    <p className="text-gold text-[0.75rem] uppercase tracking-[0.12em] mb-1">HOURS</p>
                    <p className="text-[0.9375rem] text-[rgba(255,255,255,0.8)] leading-[1.6]">Wednesday – Sunday: 6:00 PM – 10:30 PM</p>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[0.9375rem] text-[rgba(255,255,255,0.8)] leading-[1.6]">Monday & Tuesday:</p>
                      <span className="rounded-full px-2.5 py-1 text-[0.75rem] font-semibold text-white" style={{ backgroundColor: "#EF4444" }}>
                        Closed
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <CameraIcon />
                  <div>
                    <p className="text-gold text-[0.75rem] uppercase tracking-[0.12em] mb-1">INSTAGRAM</p>
                    <a
                      href="https://www.instagram.com/wheelz_cafe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.9375rem] text-white hover:text-gold transition-colors"
                    >
                      @wheelz_cafe
                    </a>
                  </div>
                </div>

                <motion.a
                  href="https://maps.app.goo.gl/VDp6KKdKHHRkFW3b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full text-center rounded-full bg-gold py-4 text-midnight uppercase"
                  style={{ fontSize: "0.9375rem", fontWeight: 700, letterSpacing: "0.05em", boxShadow: "0 6px 24px rgba(245,197,24,0.30)" }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  transition={buttonTransition}
                >
                  Get Directions →
                </motion.a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <footer className="bg-deepnavy pt-16 pb-8 px-6">
        <FadeUp className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pb-14 border-b border-[rgba(255,255,255,0.07)] mb-8">
            <div>
              <h3 className="text-white text-[1.625rem]">WHEELZ CAFE</h3>
              <div className="w-8 h-0.5 bg-gold rounded-full mt-3 mb-4" />
              <p className="text-[0.9375rem] text-[rgba(255,255,255,0.45)] leading-[1.6]">Bold Flavors. Street Soul.</p>
              <a
                href="https://www.instagram.com/wheelz_cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex text-white hover:text-gold transition-colors"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>

            <div>
              <p className="text-gold text-[0.75rem] uppercase tracking-[0.12em]">EXPLORE</p>
              <ul className="list-none mt-5 space-y-3 text-[0.9375rem] text-[rgba(255,255,255,0.6)] leading-[1.5]">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-gold text-[0.75rem] uppercase tracking-[0.12em]">CONNECT</p>
              <p className="mt-5 text-[0.9375rem] text-[rgba(255,255,255,0.55)] leading-[1.6]">
                Follow us for daily drops, new menu items, and behind-the-scenes from the cart.
              </p>
              <motion.a
                href="https://www.instagram.com/wheelz_cafe"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex rounded-full border border-[rgba(255,255,255,0.12)] px-4 py-2 text-[0.875rem] text-[rgba(255,255,255,0.75)]"
                whileHover={{ borderColor: "#F5C518", color: "#F5C518", backgroundColor: "rgba(245,197,24,0.06)" }}
                transition={{ duration: 0.2 }}
              >
                @wheelz_cafe
              </motion.a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row text-center md:text-left gap-2 text-[0.8rem] text-[rgba(255,255,255,0.28)]">
            <p>© 2025 Wheelz Cafe. All rights reserved.</p>
            <p>Made with ❤️ in Kolkata</p>
          </div>
        </FadeUp>
      </footer>
    </main>
  );
}
