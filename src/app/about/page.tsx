"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IMAGES = [
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: "#F4845F",
    panel: "#F79B7F",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/2.b977faab.png",
    bg: "#6BBF7A",
    panel: "#85CC92",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/3.4df853b4.png",
    bg: "#E882B4",
    panel: "#ED9DC4",
  },
  {
    src: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/4.4457fbce.png",
    bg: "#6EB5FF",
    panel: "#8DC4FF",
  },
];

const EASE = "cubic-bezier(0.4,0,0.2,1)";

const GRAIN_SVG = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.08"/></svg>`
)}`;

type Role = "center" | "left" | "right" | "back";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);

    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new window.Image();
      img.src = item.src;
    });
  }, []);

  const navigate = (dir: "next" | "prev") => {
    if (isAnimating) return;

    setIsAnimating(true);

    setActiveIndex((prev) =>
      dir === "next"
        ? (prev + 1) % IMAGES.length
        : (prev + IMAGES.length - 1) % IMAGES.length
    );

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const roleOf = (i: number): Role => {
    if (i === activeIndex) return "center";
    if (i === (activeIndex + 3) % 4) return "left";
    if (i === (activeIndex + 1) % 4) return "right";
    return "back";
  };

  const getRoleStyle = (role: Role): React.CSSProperties => {
    switch (role) {
      case "center":
        return {
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: "blur(0px)",
          opacity: 1,
          zIndex: 20,
          left: "50%",
          height: isMobile ? "60%" : "92%",
          bottom: isMobile ? "22%" : 0,
        };

      case "left":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "20%" : "30%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };

      case "right":
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(2px)",
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? "80%" : "70%",
          height: isMobile ? "16%" : "28%",
          bottom: isMobile ? "32%" : "12%",
        };

      default:
        return {
          transform: "translateX(-50%) scale(1)",
          filter: "blur(4px)",
          opacity: 1,
          zIndex: 5,
          left: "50%",
          height: isMobile ? "13%" : "22%",
          bottom: isMobile ? "32%" : "12%",
        };
    }
  };

  const itemTransition = `
    transform 650ms ${EASE},
    filter 650ms ${EASE},
    opacity 650ms ${EASE},
    left 650ms ${EASE},
    height 650ms ${EASE},
    bottom 650ms ${EASE}
  `;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color 650ms ${EASE}`,
        fontFamily: "var(--font-inter)",
      }}
    >
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 50,
            opacity: 0.4,
            backgroundImage: `url("${GRAIN_SVG}")`,
          }}
        />

        <div
          className="absolute inset-x-0 flex justify-center pointer-events-none"
          style={{ top: "18%", zIndex: 2 }}
        >
          <span
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(90px,28vw,380px)",
              color: "#fff",
            }}
          >
            3D SHAPE
          </span>
        </div>

        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          {IMAGES.map((item, i) => {
            const role = roleOf(i);
            const style = getRoleStyle(role);

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  aspectRatio: "0.6 / 1",
                  transition: itemTransition,
                  willChange: "transform, filter, opacity",
                  ...style,
                }}
              >
                <Image
                  src={item.src}
                  alt="figurine"
                  fill
                  unoptimized
                  style={{
                    objectFit: "contain",
                    objectPosition: "bottom center",
                  }}
                />
              </div>
            );
          })}
        </div>

        <div
          className="absolute bottom-6 left-4 sm:left-24"
          style={{ zIndex: 60 }}
        >
          <div className="flex gap-3">
            <NavButton onClick={() => navigate("prev")}>
              <ArrowLeft color="white" />
            </NavButton>

            <NavButton onClick={() => navigate("next")}>
              <ArrowRight color="white" />
            </NavButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center"
    >
      {children}
    </button>
  );
}