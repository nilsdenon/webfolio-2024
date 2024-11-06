"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    image:
      "https://photofolio.damienpierre.com/wp-content/uploads/2023/04/25042023-kobe-65.jpg",
    alt: "Array of colorful mobile devices on dark background",
    projectName: "Function Plotter Gizmo",
    backgroundColor: "bg-purple-600",
    url: "/projects/function-plotter-gizmo",
  },
  {
    id: 2,
    image:
      "https://photofolio.damienpierre.com/wp-content/uploads/2023/05/28042023-aso-34.jpg",
    alt: "Blue abstract background",
    projectName: "Neural Network Explorer",
    backgroundColor: "bg-blue-500",
    url: "/projects/function-plotter-gizmo",
  },
  {
    id: 3,
    image:
      "https://photofolio.damienpierre.com/wp-content/uploads/2023/04/26042023-fukuoka-22.jpg",
    alt: "Teal abstract background",
    projectName: "Quantum Visualizer",
    backgroundColor: "bg-teal-500",
  },
];

export function HomePage() {
  const [currentSlideId, setCurrentSlideId] = useState(slides[0].id);
  const [progress, setProgress] = useState(0);
  const duration = 5000; // 5 seconds per slide

  const advanceSlide = useCallback(() => {
    const currentIndex = slides.findIndex(
      (slide) => slide.id === currentSlideId
    );
    const nextIndex = (currentIndex + 1) % slides.length;
    const nextSlideId = slides[nextIndex].id;

    setCurrentSlideId(nextSlideId);
  }, [currentSlideId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          advanceSlide();
          return 0;
        }
        return prev + (100 / duration) * 100; // Update every 100ms
      });
    }, 100);

    return () => clearInterval(timer);
  }, [advanceSlide, duration]);

  // Find the slide object for the current slide ID
  const currentSlide = slides.find((slide) => slide.id === currentSlideId)!;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black">
      {/* Background Slideshow with Ken Burns effect */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlideId}
          className={`absolute inset-0 ${currentSlide.backgroundColor}`}
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{
            scale: { duration: 5, ease: "linear" },
            opacity: { duration: 1, ease: "easeInOut" },
          }}
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.alt}
            width={1920}
            height={1080}
            className="h-full w-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Main Navigation */}
      <nav className="relative z-10 px-8 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="#"
            className="text-2xl font-bold tracking-tighter text-white"
          >
            dp.
          </Link>
          <div className="flex items-center gap-8">
            {["home", "projects", "photofolio", "about"].map((item, index) => (
              <Link
                key={item}
                href="#"
                className={`text-sm font-medium ${
                  index === 0 ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Featured Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <h2 className="mb-4 text-lg font-light text-white/70">
            damien pierre designs products & systems
          </h2>
          <p className="text-4xl font-light text-white">
            to empower human agency.
          </p>
        </div>
      </div>

      {/* Slider Controls and Featured Project */}
      <div className="relative z-10 px-8 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
          {/* Featured Project */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-24 bg-white/20" />
            <p className="text-sm font-light text-white/70">
              Featured Project:
            </p>
            <AnimatePresence mode="wait">
              <motion.h3
                key={currentSlideId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-medium text-white"
              >
                {currentSlide.projectName}
              </motion.h3>
            </AnimatePresence>
          </div>
          <Link
            href="#"
            className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
          >
            View Project
            <svg
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          {/* Slider Navigation with Timing Transition */}
          <div className="flex items-center gap-4">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => {
                  setCurrentSlideId(slide.id);
                  setProgress(0);
                }}
                className="relative h-2 w-12 overflow-hidden rounded-full bg-white/20"
                aria-label={`Go to slide ${slide.id}`}
              >
                {slide.id === currentSlideId && (
                  <div
                    className="absolute left-0 top-0 h-full bg-white transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
