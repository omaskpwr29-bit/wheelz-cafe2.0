"use client";

import { motion } from "framer-motion";
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 52, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      viewport={{ once: true, margin: "-64px" }}
    >
      {children}
    </motion.div>
  );
}
