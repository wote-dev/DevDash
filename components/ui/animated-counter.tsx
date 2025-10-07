"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  className?: string;
}

export function AnimatedCounter({ value, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    spring.set(value);
    
    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    return () => unsubscribe();
  }, [value, spring]);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className={className}
    >
      {displayValue}
    </motion.div>
  );
}
