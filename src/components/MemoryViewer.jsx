import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trash2, Heart, Calendar } from 'lucide-react';

export const MemoryViewer = ({ memory, onBack, onDissolve }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const handleDelete = () => {
    onDissolve(memory.id);
  };

  const formattedDate = memory.created_at 
    ? new Date(memory.created_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '.')
    : new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
  return (
    <div id="memory-viewer-root" className="w-full max-w-2xl mx-auto px-4 select-none">
      {/* HEADER CONTROLS */}
      <div id="viewer-header" className="flex items-center justify-between pb-4 border-b border-borderClr/20 mb-8">
        <button id="btn-back" type="button" onClick={onBack} className="flex items-center gap-1.5 font-cinzel text-[10px] sm:text-xs text-stone-400 hover:text-primaryText uppercase tracking-widest transition-colors py-1.5">
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-500" />
          Wander Back
        </button> 
        <span id="viewer-title-meta" className="font-cinzel text-[10px] sm:text-xs text-stone-500 uppercase tracking-[0.2em]">
          Memory Fragment
        </span> 
        <div className="flex items-center gap-3">
          <button id="btn-delete-trigger" type="button" onClick={() => setShowConfirm(true)} className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all" title="Dissolve from memory wall">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* DELETE CONFIRMATION */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            id="delete-confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#040305]/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              id="delete-confirm-modal"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-cardBg border border-borderClr/30 rounded p-6 max-w-sm w-full text-center shadow-2xl"
            >
              <h3 className="font-cinzel text-primaryText text-sm uppercase tracking-wider mb-2">
                Dissolve Gate?
              </h3>
              <p className="font-serif text-xs text-stone-400 italic leading-relaxed mb-6">
                Are you certain you wish to dissolve this memory? It cannot be undone.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button id="btn-delete-cancel" type="button" onClick={() => setShowConfirm(false)} className="px-4 py-2 border border-borderClr/20 hover:bg-white/5 text-stone-400 hover:text-primaryText font-cinzel text-[10px] uppercase tracking-widest rounded-sm transition-all">
                  Retain
                </button>
                <button id="btn-delete-confirm" type="button" onClick={handleDelete} className="px-4 py-2 bg-red-700 hover:bg-red-700 text-white font-cinzel text-[10px] uppercase tracking-widest rounded-sm transition-all shadow-[0_4px_12px_rgba(239,68,68,0.2)]">
                  Dissolve
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* PARCHMENT CONTAINER */}
      <motion.div
        id="viewer-parchment-container"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="w-full relative parchment p-8 md:p-12 rounded shadow-[0_20px_50px_rgba(0,0,0,0.85)] min-h-[460px] flex flex-col justify-between overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial-[circle,transparent_55%,rgba(139,90,0,0.06)_100%] pointer-events-none" />
        {/* CONTENT INK AREA */}
        <div className="space-y-6 relative z-10 w-full flex-1 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Title and Mood*/}
            <div className="text-center space-y-3">
              <h1 id="viewer-memory-title" className="font-cinzel text-xl md:text-2xl text-amber-950 font-medium tracking-tight" >
                {memory.title}
              </h1> 
              {memory.mood && (
                <span className="inline-block px-3 py-1 text-[10px] uppercase tracking-[0.25em] font-cinzel text-amber-900/70 border border-amber-900/20 rounded-full">
                  {memory.mood}
                </span>
              )}
            </div> 
            {/* Inscription Content */}
            <p id="viewer-memory-content" className="font-serif md:text-base text-amber-950/85 leading-relaxed text-center whitespace-pre-wrap py-2">
              {memory.content}
            </p>
          </div> 
          {/* Optional Attachment Image */}
          {memory.image_url && (
            <div id="viewer-image-wrap" className="relative rounded overflow-hidden shadow-md max-w-md border border-amber-950/15 bg-amber-950/5 mx-auto mt-6">
              <img
                src={memory.image_url}
                alt={memory.title}
                className="w-full h-auto max-h-80 object-cover opacity-85 contrast-110"
              />
            </div>
          )}

          {/* Footer of the parchment */}
          <div id="viewer-parchment-footer" className="mt-8 pt-4 border-t border-dashed border-amber-900/10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-amber-900/40 uppercase tracking-widest">
            <span className="flex items-center gap-1">
              ✦ Inscribed
            </span>
            <span>
              {formattedDate}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
