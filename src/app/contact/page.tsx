"use client";

import { useEffect, useRef } from "react";
import { Inter, Instrument_Serif } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
});

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;

    const updateOpacity = () => {
      if (video.duration && !Number.isNaN(video.duration)) {
        const current = video.currentTime;
        const duration = video.duration;

        let opacity = 1;

        // Fade in
        if (current < 0.5) {
          opacity = current / 0.5;
        }
        // Fade out
        else if (duration - current < 0.5) {
          opacity = (duration - current) / 0.5;
        }

        video.style.opacity = String(
          Math.max(0, Math.min(1, opacity))
        );
      }

      rafId = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = async () => {
      video.style.opacity = "0";

      await new Promise((r) => setTimeout(r, 100));

      video.currentTime = 0;

      try {
        await video.play();
      } catch {}
    };

    video.addEventListener("ended", handleEnded);

    video.play().catch(() => {});
    rafId = requestAnimationFrame(updateOpacity);

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes fade-rise {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-rise {
          animation: fade-rise 0.8s ease-out forwards;
        }

        .animate-fade-rise-delay {
          opacity: 0;
          animation: fade-rise 0.8s ease-out 0.2s forwards;
        }

        .animate-fade-rise-delay-2 {
          opacity: 0;
          animation: fade-rise 0.8s ease-out 0.4s forwards;
        }
      `}</style>

      <main
        className={`relative min-h-screen w-full overflow-hidden bg-white ${inter.className}`}
      >
        {/* Video Background */}
        <div
          className="absolute z-0 w-full overflow-hidden"
          style={{
            top: "300px",
            inset: "auto 0 0 0",
          }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="w-full object-cover"
            style={{
              opacity: 0,
            }}
          >
            <source src={VIDEO_URL} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
        </div>

        

        {/* Hero */}
        <section
          className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 text-center"
          style={{
            paddingTop: "calc(8rem - 75px)",
          }}
        >
          <h1
            className={`${instrumentSerif.className} animate-fade-rise max-w-7xl text-5xl font-normal text-black sm:text-7xl md:text-8xl`}
            style={{
              lineHeight: 0.95,
              letterSpacing: "-2.46px",
            }}
          >
            Beyond{" "}
            <span className="italic text-[#6F6F6F]">
              silence,
            </span>{" "}
            we build{" "}
            <span className="italic text-[#6F6F6F]">
              the eternal.
            </span>
          </h1>

          <p className="animate-fade-rise-delay mt-8 max-w-2xl text-base leading-relaxed text-[#6F6F6F] sm:text-lg">
            Building platforms for brilliant minds, fearless
            makers, and thoughtful souls. Through the noise, we
            craft digital havens for deep work and pure flows.
          </p>

          <button className="animate-fade-rise-delay-2 mt-12 rounded-full bg-black px-14 py-5 text-base text-white transition-transform duration-300 hover:scale-[1.03]">
            Begin Journey
          </button>
        </section>
      </main>
    </>
  );
}