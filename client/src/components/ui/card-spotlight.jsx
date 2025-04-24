"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const CardSpotlight = ({ 
  children, 
  className, 
  spotlightSize = 500,
  borderColor,  // Border color prop
  glareColor = "rgba(59, 130, 246, 0.1)",  // Default blue glow color
  ...props 
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    setPosition({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top 
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Remove any non-DOM props before passing to div
  const { glareColor: _, ...domProps } = props;

  return (
    <div
      ref={divRef}
      className={cn(
        "relative overflow-hidden rounded-xl border",
        !borderColor && "border-gray-200",
        className
      )}
      style={{
        ...(borderColor && { borderColor }),
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...domProps}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${glareColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};