"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

type HiddenVariant = { opacity: number; y?: number; x?: number };

export default function AnimSection({ children, className = "", delay = 0, direction = "up" }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const controls = useAnimation();

  const hiddenMap: Record<string, HiddenVariant> = {
    up:    { opacity: 0, y: 40 },
    down:  { opacity: 0, y: -40 },
    left:  { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    none:  { opacity: 0 },
  };

  const hidden = hiddenMap[direction];

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, x: 0, y: 0 });
    } else {
      controls.start(hidden);
    }
  }, [isInView, controls, direction]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={controls}
      transition={{ duration: 0.65, ease: "easeOut", delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}