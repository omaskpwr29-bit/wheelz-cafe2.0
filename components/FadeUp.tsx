"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
};

export function FadeUp({
  children,
  className,
  delay = 0,
  x = 0,
}: FadeUpProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 32, x }}
      whileInView={reduceMotion ? { opacity: 1, y: 0, x: 0 } : { opacity: 1, y: 0, x: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay, ease: EASE_OUT }}
      viewport={{ once: true, margin: "-64px" }}
    >
      {children}
    </motion.div>
  );
}
