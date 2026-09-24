import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import React, { ReactNode } from 'react';

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isHovered = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 50 });
  const hoverSpring = useSpring(isHovered, { stiffness: 300, damping: 40 });

  // Increased tilt effect from 10deg to 22deg for more drama
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["22deg", "-22deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-22deg", "22deg"]);

  // Dynamic drop shadow that shifts in opposite direction of tilt
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], ["-30px", "30px"]);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], ["-30px", "40px"]);
  const boxShadow = useMotionTemplate`${shadowX} ${shadowY} 60px rgba(0, 0, 0, 0.35)`;

  // Glare effect coordinates moving with the mouse
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    isHovered.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    isHovered.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        boxShadow,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }} className="w-full h-full relative rounded-[inherit]">
        {children}
        
        {/* Dynamic glare overlay */}
        <motion.div 
          className="pointer-events-none absolute inset-0 z-40 rounded-[inherit] overflow-hidden"
          style={{
            opacity: hoverSpring,
            background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.45) 0%, transparent 75%)`,
            mixBlendMode: "overlay"
          }}
        />
      </div>
    </motion.div>
  );
}
