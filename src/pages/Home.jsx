import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {Sparkles, ArrowRight, BookOpen, Landmark, Camera} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';


export default function Home() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center px-5 sm:px-6 pt-12 sm:pt-25 text-center max-w-6xl mx-auto relative z-10 select-none">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <span className="font-mono text-[8px] sm:text-[10px]  text-primaryText/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] border border-borderClr rounded-full px-4 sm:px-5 py-2">
          {user ? "Wanderer Recognized" : "Silent Archive"}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
        className="space-y-4 mt-8"
      >
        <h1 className="font-cinzelDecorative text-3xl sm:text-5xl md:text-6xl text-primaryText tracking-widest sm:tracking-[0.15em] uppercase text-glow font-medium">
          {user ? "Welcome, Wanderer" : "Memory Palace"}
        </h1>
        <p className="mt-5 font-cinzel text-[10px] sm:text-sm text-secondaryText/60 uppercase tracking-[0.2em] sm:tracking-[0.35em] font-medium px-2">
          {user ? "Beyond Every Door Lies A Fragment Of You" : "A Silent Space For Forgotten Fragments"}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
        className="font-serif text-sm sm:text-base text-stone-300 max-w-2xl mt-8 sm:mt-10 leading-relaxed font-light px-2"
      >
        {user
          ? "Your memories are waiting. Continue exploring old moments, adding new ones, and shaping your palace one room at a time."
          : "Every memory becomes a place of its own. Walk through old moments, revisit forgotten stories, and build a palace from the things that shaped you."}
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
        className="mt-5 italic text-primaryText/70 text-xs sm:text-base font-serif tracking-wider sm:tracking-[0.12em] px-4">
        {user ? "“Some memories wait quietly for your return. The forgotten always find their way back.”" : "“Some memories are not found. They drift back to you.”"}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.0, ease: 'easeOut' }}
         className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-15 w-full sm:w-auto">
        <Link to="/memorywall" className="px-6 sm:px-8 py-3.5 bg-cardBg border border-borderClr text-primaryText hover:bg-white/5 font-cinzel text-xs uppercase tracking-[0.25em] flex items-center gap-2 rounded-sm transition-all duration-500">
          {user ? "Explore Memories" : "Enter The Palace"}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link> 
      </motion.div>
      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
        className="w-full max-w-3xl mt-14 sm:mt-12 pt-10 mb-12 sm:pt-12 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-left">
          <div>
            <span className="text-secondaryText/70 font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase flex items-center gap-2 mb-4 sm:mb-5">
              <Landmark className="w-3 h-3" />
              01 / Spatial Archive
            </span>
            <p className="font-serif text-xs text-stone-600 leading-relaxed font-light">
              Instead of disappearing into folders, your memories live inside a dreamlike palace — each one waiting behind its own door.
            </p>
          </div>
          <div>
            <span className="text-secondaryText/70 font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase flex items-center gap-2 mb-4 sm:mb-5">
              <BookOpen className="w-3 h-3" />
              02 / Epistolary Prose
            </span>
            <p className="font-serif text-xs text-stone-600 leading-relaxed font-light">
              Some thoughts are too personal for timelines and feeds. Write honestly, slowly, and without interruption.
            </p>
          </div>
          <div>
            <span className="text-secondaryText/70 font-cinzel text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] uppercase flex items-center gap-2 mb-4 sm:mb-5">
              <Camera className="w-3 h-3" />
              03 / Visual Relics
            </span>
            <p className="font-serif text-xs text-stone-600 leading-relaxed font-light">
              Preserve photographs, fragments, and little pieces of life beside the memories they belong to.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}