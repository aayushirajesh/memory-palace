import React, { useState } from 'react';
import { motion } from 'framer-motion';
import doorImage from '../assets/door.png';

export const FloatingDoor = ({ memory, onClick, x, y, scale, opacity, zIndex, blur, }) => {
  const [isHovered, setIsHovered] = useState(false);
  const displayScale = isHovered ? scale * 1.03 : scale;
  const displayOpacity = isHovered ? Math.min(1.0, opacity + 0.1) : opacity;
  const displayBlur = isHovered ? 0 : blur;
  const finalZIndex = isHovered ? 200 : zIndex;

  return (
    <motion.div className="absolute flex flex-col items-center justify-center cursor-pointer select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: finalZIndex,
      }}
      animate={{
        scale: displayScale,
        opacity: displayOpacity,
        filter: `blur(${displayBlur}px)`,
      }}
      transition={{ duration: 1.6,
        ease: [0.28, 0.11, 0.32, 1.0], // slow drifting transition
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick(memory);
      }}
    >
      {/* Soft background glow */}
      <div 
        className="relative w-28 h-40 sm:w-36 sm:h-52 md:w-40 md:h-56 transition-all duration-[1500ms] ease-out-quint"
      >
        <div 
          className={`absolute inset-0 rounded-t-full transition-all duration-[1800ms] ease-in-out blur-3xl -z-10 ${
            isHovered 
              ? 'bg-[#E7D3A8]/10 scale-105 opacity-80' 
              : 'bg-amber-900/5 scale-95 opacity-30'
          }`}
        />
        <img
          src={doorImage}
          alt="Memory Palace Gate"
          className="relative w-52 sm:w-64 drop-shadow-[0_20px_50px_rgba(185,138,74,0.3)]"
        />
      </div>
      {/* metadata label shown beneath door */}
      <motion.div
        className="mt-4 flex flex-col items-center text-center pointer-events-none"
        initial={{ opacity: 0.4, y: 0 }}
        animate={{
          opacity: isHovered ? 0.95 : 0.4,
          y: isHovered ? 1 : 0,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h4 className="font-cinzel text-[11px] sm:text-xs text-primaryText uppercase tracking-[0.25em] transition-colors duration-1000 max-w-[150px] truncate" >
          {memory.title}
        </h4>
        <span className="font-mono text-[8px] sm:text-[9px] text-[#b98a4a]/60 mt-1 uppercase tracking-[0.3em]">
          {new Date(memory.created_at).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).replace(/\//g, '.')}
        </span>
      </motion.div>
    </motion.div>
  );
};
