"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 18 + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setDone(true);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 600);
      }
      setProgress(Math.floor(current));
    }, 160);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Noise overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "url(data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)",
            }}
          />

          {/* SD Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12 flex h-28 w-28 items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 rounded-2xl border border-white/20"
              animate={{
                rotate: 360,
                borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.6)", "rgba(255,255,255,0.2)"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
              className="font-display text-4xl font-bold tracking-tight text-white"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SD
            </motion.span>
          </motion.div>

          {/* Progress line */}
          <div className="h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </div>

          <motion.p
            className="mt-6 font-mono text-xs tracking-[0.3em] text-secondary"
            animate={{ opacity: done ? 0 : 1 }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
