"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button, ButtonProps } from "./button";

export const AnimatedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        style={{ display: "inline-block" }}
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
