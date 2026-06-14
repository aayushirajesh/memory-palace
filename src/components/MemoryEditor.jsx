import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, ArrowLeft, Send } from 'lucide-react';
import doorImage from '../assets/door.png';

const ANIMATION_STAGES = [                        //each scene has a duration (x)
  { name: 'settling',       duration: 1800 },
  { name: 'folding-top',    duration: 1500 },
  { name: 'folding-bottom', duration: 1500 },
  { name: 'stillness',      duration: 1800 },
  { name: 'sealing',        duration: 1600 },
  { name: 'resting',        duration: 1800 },
  { name: 'dissolving',     duration: 1800 },
  { name: 'gate-emerging',  duration: 2000 },
  { name: 'returning',      duration: 1500 },
];

function useAnimationSequence(onComplete) {
  const [stage, setStage] = useState('idle');  
  const timerRef = useRef(null);        //stores active setTimeout ID so we can cancel it
  const cancel = useCallback(() => {    //to cancel ongoing animation and reset to idle
    clearTimeout(timerRef.current);
    setStage('idle');
  }, []);
  const start = useCallback(() => {    //starts the animation sequence from the beginning
    let index = 0;
    function advance() {
      const current = ANIMATION_STAGES[index];
      setStage(current.name);
      if (index === ANIMATION_STAGES.length - 1) {    //last scene
        timerRef.current = setTimeout(() => {
          onComplete();
        }, current.duration);
      } 
      else {
        timerRef.current = setTimeout(() => {         //after current scene duration, move to next scene
          index += 1;
          advance();
        }, current.duration);
      }
    }
    advance();
  }, [onComplete]);

  useEffect(() => () => clearTimeout(timerRef.current), []);  //cleanup fun. called when component is unmounted, eg. if user navigates away during animation, ensures no timers are left hanging and trying to update state on unmounted component
  return { stage, start, cancel };
}

const paperWrapperVariants = {          //use on any motion element like <motion.div animate={stage} variants={paperWrapperVariants} />
  idle: { opacity: 0, scale: 0.8 },
  settling:         { opacity: 1, scale: 1.0, y: 0, rotateZ: 0, filter: 'drop-shadow(0px 12px 30px rgba(0,0,0,0.55))'},
  'folding-top':    { opacity: 1, scale: 1.0, y: 0, rotateZ: 0.08, filter: 'drop-shadow(0px 12px 30px rgba(0,0,0,0.55))'},
  'folding-bottom': { opacity: 1, scale: 1.0, y: 0, rotateZ: 0, filter: 'drop-shadow(0px 12px 30px rgba(0,0,0,0.55))'},
  stillness:        { opacity: 1, scale: 1.0, y: 0, rotateZ: 0, filter: 'drop-shadow(0px 12px 30px rgba(0,0,0,0.55))'},
  resting:          { opacity: 1, scale: 1.0, y: 0, rotateZ: 0, filter: 'drop-shadow(0px 12px 30px rgba(0,0,0,0.55))' },
  sealing: {
    opacity: 1,
    scale: [1.0, 0.97, 1.01, 1.0],
    y: [0, 3, 0, 0.5],
    rotateZ: [0, -0.05, 0],
    filter: 'drop-shadow(0px 8px 18px rgba(0,0,0,0.45))',
  },
  dissolving: {
    opacity: [1, 0.4, 0],
    scale: [1.0, 0.88, 0.75],
    y: [0, -15, -30],
    filter: 'blur(4px) drop-shadow(0px 4px 15px rgba(0,0,0,0.25))',
  },
};
const topFlapVariants = {
  open:   { rotateX: 0 },
  folded: { rotateX: -180 },
};
const bottomFlapVariants = {
  open:   { rotateX: 0 },
  folded: { rotateX: -180 },
};
const waxSealVariants = {
  hidden: { scale: 0.4, opacity: 0, rotate: -15 },
  sealing: {
    scale: [1.6, 0.94, 1.03, 1.0],
    opacity: 1,
    rotate: [15, -2, 1, 0],
    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.45))',
  },
  resting: {
    scale: 1.0, opacity: 1, rotate: 0,
    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.45))',
  },
  dissolving: { scale: 0.85, opacity: 0, filter: 'blur(3.5px)' },
};
const gateVariants = {
  hidden:          { opacity: 0,    scale: 0.82, y: -5  },
  dissolving:      { opacity: 0.35, scale: 0.92, y: -10 },
  'gate-emerging': { opacity: 0.75, scale: 1.0,  y: 0   },
  returning:       { opacity: 0.75, scale: 1.0,  y: 0   },
};

// Helper functions. Take a stage name and return which variant key the flap should use.
function topFlapVariant(stage) {
  return stage === 'settling' ? 'open' : 'folded';
}
function bottomFlapVariant(stage) {
  return stage === 'settling' || stage === 'folding-top' ? 'open' : 'folded';
}
function waxSealVariant(stage) {
  if (stage === 'sealing')        return 'sealing';
  if (stage === 'resting')        return 'resting';
  if (stage === 'dissolving' || stage === 'gate-emerging' || stage === 'returning') return 'dissolving';
  return 'hidden';
}
function gateVariant(stage) {
  if (stage === 'dissolving')      return 'dissolving';
  if (stage === 'gate-emerging')   return 'gate-emerging';
  if (stage === 'returning')       return 'returning';
  return 'hidden';
}

//using set cuz its faster than array to scan stages. O(1) vs O(n) for array.includes()
const PAPER_VISIBLE_STAGES = new Set([           
  'settling', 'folding-top', 'folding-bottom',
  'stillness', 'sealing', 'resting', 'dissolving',
]);
const RESONANCE_STAGES = new Set(['sealing', 'resting', 'gate-emerging']);

// Sub-components 
function ResonanceRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 2.1, opacity: [0, 0.015, 0] }}
        transition={{ duration: 6.0, repeat: Infinity, ease: 'easeOut' }}
        className="absolute w-60 h-60 rounded-full border border-[#b98a4a]/8"
      />
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 2.5, opacity: [0, 0.008, 0] }}
        transition={{ duration: 7.0, delay: 2.5, repeat: Infinity, ease: 'easeOut' }}
        className="absolute w-60 h-60 rounded-full border border-[#b98a4a]/4"
      />
    </div>
  );
}
function MemoryGate({ gateVariantKey }) {
  return (
    <motion.div
      initial="hidden"
      animate={gateVariantKey}    // instead of {opacity:1} an object,  {gateVariantKey} is a string - a key name. Framer Motion will look up that key in the gateVariants object and animate to those values. So if gateVariantKey is 'dissolving', it will animate to { opacity: 0.35, scale: 0.92, y: -10 }
      variants={gateVariants}
      transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}  // cubic-bezier curve [four numbers defining a custom speed curve], used instead of easeOut preset.
      className="absolute flex flex-col items-center justify-center pointer-events-none z-10"
    >
      <div className="relative w-48 h-64 sm:w-56 sm:h-72 transition-all duration-1500">
        <div className="absolute inset-0 rounded-t-full transition-all duration-1800 blur-3xl -z-10 bg-amber-900/5 scale-95 opacity-30" />
        <img
          src={doorImage}
          alt="Memory Palace Gate"
          className="relative w-52 sm:w-64 drop-shadow-[0_20px_50px_rgba(185,138,74,0.3)]"
        />
      </div>
      <span className="font-cinzel text-[9.6px] text-[#b98a4a]/40 uppercase tracking-[0.25em] mt-3">
        Memory Portal Crystallized
      </span>
    </motion.div>
  );
}
function WaxSeal({ variantKey }) {
  const isGlowing = variantKey === 'sealing' || variantKey === 'resting';
  return (
    <motion.div
      initial="hidden"
      animate={variantKey}
      variants={waxSealVariants}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], times: [0, 0.45, 0.75, 1] }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center pointer-events-none"
    >
      {isGlowing && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={
            variantKey === 'sealing'
              ? { scale: [0.6, 1.15, 1.0], opacity: [0, 0.3, 0.2] }
              : { scale: [1.0, 1.05, 1.0], opacity: [0.2, 0.12, 0.2] }
          }
          transition={
            variantKey === 'sealing'
              ? { duration: 1.2, ease: 'easeOut' }
              : { duration: 4.0, repeat: Infinity, ease: 'easeInOut' }
          }
          className="absolute w-24 h-24 rounded-full bg-[#b98a4a] blur-xl -z-10 pointer-events-none"
        />
      )}
      <div className="relative w-14 h-14 rounded-full bg-linear-to-br from-primaryText via-[#b98a4a] to-[#5d4119] border border-[#d4af37]/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_3px_8px_rgba(0,0,0,0.55)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-1 rounded-full border border-black/10 bg-linear-to-tr from-[#9c7138] to-[#b98a4a] opacity-85" />
        <div className="absolute inset-2.5 rounded-full border border-[#ffe9be]/25 bg-[#7c5625] flex items-center justify-center shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.65)]">
          <span className="text-primaryText text-[9px] font-serif font-bold italic">✦</span>
        </div>
      </div>
    </motion.div>
  );
}
function AnimatedPaper({ stage, title, content }) {
  const wrapperVariantKey = paperWrapperVariants[stage] ? stage : 'idle';
  const isCalm = ['settling', 'folding-top', 'folding-bottom', 'stillness', 'resting'].includes(stage);
  return (
    <motion.div style={{ perspective: 1200 }} className="relative flex flex-col items-center justify-center">
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={wrapperVariantKey}
        variants={paperWrapperVariants}
        transition={
          stage === 'dissolving'
            ? { duration: 2.0, ease: [0.22, 1, 0.36, 1] }
            : stage === 'sealing'
            ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
            : { repeat: Infinity, duration: 5, ease: 'easeInOut' }
        }
        className="w-64 h-80 relative flex flex-col justify-between"
      >
        {/* TOP FLAP */}
        <motion.div
          style={{ 
            transformOrigin: 'bottom center', 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          animate={topFlapVariant(stage)}
          variants={topFlapVariants}
          transition={{ duration: 1.8, ease: [0.25, 1, 0.5, 1] }}
          className="absolute top-0 left-0 w-full h-20 z-30"
        >
          {/* FRONT (Open) */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-[#faf6ea] border-t border-l border-r border-b border-dashed border-amber-900/10 rounded-t px-5 py-3.5 flex flex-col justify-start"
          >
            <div className="absolute inset-0 bg-radial-[circle,transparent_55%,rgba(139,90,0,0.03)_100%] pointer-events-none" />
            <span className="font-cinzel text-[10px] text-amber-950/70 uppercase tracking-wider font-semibold truncate leading-none relative z-10">
              {title || 'Untitled Fragment'}
            </span>
            <div className="w-10 h-0.5 bg-amber-900/15 mt-1.5 relative z-10" />
          </div>

          {/* BACK (Folded down) */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }}
            className="absolute inset-0 bg-[#faf6ea] border-b border-l border-r border-[#ebdcb9]/40 rounded-b shadow-[inset_0_4px_12px_rgba(0,0,0,0.06),0_6px_12px_rgba(0,0,0,0.15)] flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-radial-[circle,transparent_45%,rgba(139,90,0,0.05)_100%] pointer-events-none" />
            <div className="w-full h-0.5 bg-amber-900/5" />
          </div>
        </motion.div>

        {/* MIDDLE STATIC PANEL */}
        <motion.div
          animate={{ opacity: isCalm ? 1 : 0 }}
          transition={{ duration: 1.0 }}
          className="absolute top-20 left-0 w-full h-40 bg-[#faf6ea] border-l border-r border-[#ebdcb9]/40 z-20 flex flex-col justify-start overflow-hidden px-5 py-3"
        >
          <div className="absolute inset-0 bg-radial-[circle,transparent_55%,rgba(139,90,0,0.05)_100%] pointer-events-none" />
          <p className="font-serif text-[9px] text-amber-950/60 leading-relaxed italic line-clamp-5 relative z-10">
            {content || 'No words inscribed.'}
          </p>
        </motion.div>

        {/* BOTTOM FLAP */}
        <motion.div
          style={{ 
            transformOrigin: 'top center', 
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          animate={bottomFlapVariant(stage)}
          variants={bottomFlapVariants}
          transition={{ duration: 2.0, ease: [0.25, 1, 0.5, 1] }}
          className="absolute bottom-0 left-0 w-full h-20 z-40"
        >
          {/* FRONT (Open) */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-[#faf6ea] border-b border-l border-r border-t border-dashed border-amber-900/10 rounded-b px-5 py-3 flex flex-col justify-end"
          >
            <div className="absolute inset-0 bg-radial-[circle,transparent_55%,rgba(139,90,0,0.03)_100%] pointer-events-none" />
            <div className="flex justify-between items-center text-[7px] font-mono text-amber-900/40 uppercase tracking-widest leading-none relative z-10">
              <span>✦ IMMORTALIZED</span>
              <span>{new Date().toLocaleDateString('en-GB').replace(/\//g, '.')}</span>
            </div>
          </div>

          {/* BACK (Folded up) */}
          <div 
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }}
            className="absolute inset-0 bg-[#faf6ea] border-t border-l border-r border-[#ebdcb9]/40 rounded-t shadow-[inset_0_-4px_12px_rgba(0,0,0,0.06),0_-6px_12px_rgba(0,0,0,0.2)] flex flex-col justify-start"
          >
            <div className="absolute inset-0 bg-radial-[circle,transparent_45%,rgba(139,90,0,0.05)_100%] pointer-events-none" />
            <div className="w-full h-0.5 bg-amber-900/5" />
          </div>
        </motion.div>

        {/* wax seal centering perfectly on top-1/2 left-1/2 of final package */}
        <WaxSeal variantKey={waxSealVariant(stage)} />
      </motion.div>
    </motion.div>
  );
}

function SaveAnimationOverlay({ stage, title, content }) {
  const showPaper     = PAPER_VISIBLE_STAGES.has(stage);
  const showResonance = RESONANCE_STAGES.has(stage);
  const overlay = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
      className="bg-[#040305] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(185,138,74,0.025) 0%, transparent 70%)' }} />
      {showResonance && <ResonanceRings />}
      <MemoryGate gateVariantKey={gateVariant(stage)} />
      <div className="relative w-full max-w-sm flex items-center justify-center z-20" style={{ height: '26rem' }}>
        {showPaper && <AnimatedPaper stage={stage} title={title} content={content} />}
      </div>
    </motion.div>
  );
// By portaling the overlay to the body, we ensure it covers the entire viewport and isn't affected by any parent component's styles or transforms. This is crucial for the save animation to feel immersive and not be constrained by the MemoryEditor's layout.
  return ReactDOM.createPortal(overlay, document.body); 
}

export const MemoryEditor = ({ onSave, onCancel }) => {
  const [title,       setTitle]       = useState('');
  const [content,     setContent]     = useState('');
  const [imageBase64, setImageBase64] = useState(undefined);
  const [isSubmitting,setIsSubmitting]= useState(false);
  const [error,       setError]       = useState(null);
  const [textAlign,   setTextAlign]   = useState('left');
  const [fontSize,    setFontSize]    = useState('normal');
  const [mood, setMood] = useState("dreamy");
  const fileInputRef = useRef(null);
  const handleAnimationComplete = useCallback(() => {
    onSave(title.trim(), content.trim(), imageBase64, mood).catch((err) => {
      setError(err.message || 'Failed to engrave memory fragment.');
      setIsSubmitting(false);
      cancel();
    });
  }, [title, content, imageBase64, mood,onSave]);

  const { stage, start: startAnimation, cancel } = useAnimationSequence(handleAnimationComplete);
  const isAnimating = stage !== 'idle';  // true whenever we're in the middle of the animation sequence, from the moment user clicks "Save" until the final scene completes and calls onSave callback

  const handleSubmit = () => {
    if (!title.trim())   { setError('Identify your registry fragment with a title.');     return; }
    if (!content.trim()) { setError('A blank parchment holds no memory. Inscribe some text.'); return; }
    setError(null);
    setIsSubmitting(true);
    startAnimation();
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3.5 * 1024 * 1024) { setError('This visual file is too grand (limit: 3MB).'); return; }
    const reader = new FileReader();
    reader.onloadend = () => { setImageBase64(reader.result); setError(null); };
    reader.onerror  = () =>   setError('An error occurred reading your file.');
    reader.readAsDataURL(file);
  };
  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImageBase64(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  const cycleAlignment = () => {
    setTextAlign(a => a === 'left' ? 'center' : a === 'center' ? 'right' : 'left');
  };
  const cycleFontSize = () => {
    setFontSize(s => s === 'normal' ? 'large' : s === 'large' ? 'grand' : 'normal');
  };
  const textAlignClass = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  const fontSizeClass  = fontSize  === 'normal'  ? 'text-sm md:text-base' : fontSize === 'large' ? 'text-base md:text-lg' : 'text-lg md:text-xl';
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3 select-none flex flex-col relative">
      {/* ── TOOLBAR HEADER ── */}
      <div className="w-full max-w-2xl mx-auto mb-6">
        <div className="flex items-center justify-between pb-4 border-b border-borderClr/20">
          <button type="button" onClick={onCancel}
            className="flex items-center gap-1.5 font-cinzel text-[10px] sm:text-xs text-stone-400 hover:text-primaryText uppercase tracking-widest transition-colors py-1.5">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-500" />
            Back Home
          </button>
          <span className="font-cinzel text-xs sm:text-sm text-primaryText uppercase tracking-[0.25em] font-medium select-none text-center">
            New Memory
          </span>
          <button type="button" disabled={isSubmitting} onClick={handleSubmit}
            className="font-cinzel text-[10px] sm:text-xs text-primaryText/80 hover:text-primaryText uppercase tracking-widest transition-colors flex items-center gap-1.5 disabled:opacity-50 py-1.5">
            {isSubmitting ? 'Carving' : 'Save'}
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b98a4a]" />
          </button>
        </div>
        {/* Floating formatting toolbar */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 bg-cardBg border border-borderClr/25 rounded-full shadow-xl shadow-black/80 backdrop-blur-md">
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className={`p-1.5 sm:p-2 rounded-full transition-colors ${imageBase64 ? 'text-primaryText hover:bg-stone-800' : 'text-stone-400 hover:text-primaryText hover:bg-white/5'}`}
              title="Bind Visual snap">
              <ImageIcon className="w-4 h-4" />
            </button>
            <button type="button" onClick={cycleAlignment}
              className="p-1.5 sm:p-2 text-stone-400 hover:text-primaryText hover:bg-white/5 rounded-full transition-colors"
              title="Align Text direction">
              {textAlign === 'left' ? <AlignLeft className="w-4 h-4" /> : textAlign === 'center' ? <AlignCenter className="w-4 h-4" /> : <AlignRight className="w-4 h-4" />}
            </button>
            <button type="button" onClick={cycleFontSize}
              className={`p-1.5 sm:p-2 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all px-2.5 flex items-center justify-center ${fontSize !== 'normal' ? 'bg-cardBg text-primaryText border border-borderClr/40' : 'text-stone-400 hover:text-primaryText hover:bg-white/5'}`}
              title="Cycle Inscription Size">
              Aa
            </button>
            <div> 
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="bg-cardBg border border-borderClr/25 rounded-full px-4 py-3 text-primaryText font-cinzel text-[10px] sm:text-xs uppercase tracking-widest outline-none cursor-pointer"
              >
                <option value="dreamy">Dreamy</option>
                <option value="nostalgic">Nostalgic</option>
                <option value="bittersweet">Bittersweet</option>
                <option value="melancholy">Melancholy</option>
                <option value="nightmare">Nightmare</option>
                <option value="hopeful">Hopeful</option>
                <option value="serene">Serene</option>
                <option value="forgotten">Forgotten</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      {/* ── PARCHMENT WORKSPACE ── */}
      <div className="relative w-full max-w-2xl mx-auto flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full relative parchment p-8 md:p-12 rounded shadow-[0_20px_50px_rgba(0,0,0,0.85)] min-h-115 overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-radial-[circle,transparent_55%,rgba(139,90,0,0.06)_100%] pointer-events-none" />
          <div className="space-y-6 flex-1 flex flex-col justify-between relative z-10 w-full">
            {error && (
              <div className="text-xs bg-red-950/5 border border-red-900/10 text-red-900 py-2 px-3 rounded font-mono">
                {error}
              </div>
            )}
            <div className="space-y-5 flex-1 flex flex-col">
              <input type="text" placeholder="Give your memory a name..." value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full bg-transparent font-cinzel text-lg md:text-xl text-amber-950 border-b border-amber-900/10 placeholder-amber-950/20 py-1.5 focus:outline-none focus:border-amber-950/40 font-medium tracking-tight ${textAlignClass}`}
                maxLength={42} />
              <textarea
                placeholder="Let your thoughts flow like ink onto parchment..."
                value={content} onChange={(e) => setContent(e.target.value)} rows={10}
                className={`w-full bg-transparent font-serif md:leading-relaxed text-amber-950/85 placeholder-amber-950/20 py-2 focus:outline-none resize-none flex-1 ${fontSizeClass} ${textAlignClass}`}
              />
            </div>
            <AnimatePresence>
              {imageBase64 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }}
                  className="relative rounded overflow-hidden shadow-md max-w-md h-32 md:h-40 border border-amber-950/15 bg-amber-950/5 mx-auto mt-4">
                  <img src={imageBase64} alt="Attendant snapshot" className="w-full h-full object-cover opacity-85 contrast-110" referrerPolicy="no-referrer" />
                  <button type="button" onClick={handleRemoveImage}
                    className="absolute top-2.5 right-2.5 bg-stone-900/80 hover:bg-black text-amber-100 p-1.5 rounded transition-all"
                    title="remove image">
                    <span className="font-mono text-[8px] uppercase tracking-widest font-semibold">Remove</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      {/* SAVE ANIMATION OVERLAY - portaled to body, escapes all transforms */}
      <AnimatePresence>
        {isAnimating && <SaveAnimationOverlay stage={stage} title={title} content={content} />}
      </AnimatePresence>
    </div>
  );
};