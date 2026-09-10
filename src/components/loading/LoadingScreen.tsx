"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("sd_loaded")) {
      setVisible(false);
      onComplete();
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 25 + 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("sd_loaded", "1");
        }
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 200);
      }
      setProgress(Math.min(100, Math.floor(current)));
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0a0a0c]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.35, ease: "easeInOut" },
          }}
        >
          {/* Minimal SD initials box */}
          <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/5">
            <span className="font-display text-lg font-bold text-white">SD</span>
          </div>

          {/* Thin progress line */}
          <div className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>

          <div className="mt-3 font-mono text-[11px] tracking-wider text-secondary">
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
