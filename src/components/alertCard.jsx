import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Card = ({ errorMsg }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-2 w-[90%] sm:max-w-md z-50 mt-6 mx-auto select-none"
    >
      <div className="flex items-start gap-4 w-full p-4 sm:px-5 sm:py-4 justify-between rounded-xl bg-cardBg/95 backdrop-blur-xl border border-borderClr/30 shadow-[0_10px_40px_rgb(0,0,0,0.6)] relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-900/50 to-transparent"></div>
        
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-900/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex-shrink-0 mt-0.5 relative z-10">
          <div className="w-8 h-8 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center text-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
            <span className="font-cinzelDecorative text-sm">✦</span>
          </div>
        </div>

        <div className="flex-1 pt-[2px] relative z-10">
          <h4 className="text-red-400/90 font-cinzel text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium mb-1.5">
            System Notice
          </h4>
          <p className="text-primaryText/70 font-serif text-xs sm:text-[13px] leading-relaxed tracking-wide">
            {errorMsg}
          </p>
        </div>

        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 4.5, ease: "linear" }}
          className="absolute bottom-0 left-0 h-[2px] bg-red-500/30"
        />
      </div>
    </motion.div>
  );
}

export default Card;
