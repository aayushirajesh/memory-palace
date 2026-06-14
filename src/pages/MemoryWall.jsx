import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingDoor } from '../components/FloatingDoor';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, AlertCircle, ChevronUp, ChevronDown, PenTool, ArrowLeft } from 'lucide-react';
import { fetchMemories } from "../services/memoryService";

export default function MemoryWall() {  
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Scroll rotation position for the carousel
  const [scrollAngle, setScrollAngle] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [dragStartY, setDragStartY] = useState(null);

  // References for responsive coordinate sizing
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 });
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragDistanceRef = useRef(0);

  useEffect(() => { 
    async function load() { 
      try { 
        const data = await fetchMemories(); 
        setMemories(data); 
      } 
      catch (error) { 
        console.error(error); 
      } 
      finally { 
        setLoading(false);
      }
    } 
    load(); 
  }, []);

  // Track resizing of the parent canvas to keep projections responsive and correctly mapped to the display area
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width || 1000,
          height: entry.contentRect.height || 600,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Continuous passive automatic drifting rotation
  useEffect(() => {
    if (!isAutoPlay) return; 
    let animId;
    let lastTime = performance.now(); 
    const tick = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Slow drift (approx. 0.4 radians per second)
      setScrollAngle((prev) => prev + delta * 0.4);

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isAutoPlay]);

  // Handle manual scroll wheel interactions to spin the carousel
  const handleWheel = (e) => {
    setIsAutoPlay(false);
    const deltaAngle = e.deltaY * 0.0035;
    setScrollAngle((prev) => prev + deltaAngle);
    const timer = setTimeout(() => {    // Resume auto-play after 4 seconds of stillness
      setIsAutoPlay(true);
    }, 4000);
    return () => clearTimeout(timer);
  };

  const handleMouseDown = (e) => {
    setIsAutoPlay(false);
    setDragStartY(e.clientY);
    dragDistanceRef.current = 0;
    isDraggingRef.current = false;
  };
// Handle mouse movement for dragging to rotate the carousel, with a threshold to prevent accidental clicks from minor movements
  const handleMouseMove = (e) => {
    if (dragStartY === null) return;
    const diffY = e.clientY - dragStartY;
    
    dragDistanceRef.current += Math.abs(diffY);
    if (dragDistanceRef.current > 6) {
      isDraggingRef.current = true;
    }
// Adjust scroll angle based on vertical drag distance, with a sensitivity factor
    const deltaAngle = -diffY * 0.005;
    setScrollAngle((prev) => prev + deltaAngle);
    setDragStartY(e.clientY);
  };

  const handleMouseUpOrLeave = () => {
    setDragStartY(null);
    // Restart autoplay after a slight delay
    const timer = setTimeout(() => {
      setIsAutoPlay(true);
    }, 3000);
    return () => clearTimeout(timer);
  };

// Touch handlers for mobile dragging interactions, mirroring mouse drag logic with touch events
  const handleTouchStart = (e) => {
    setIsAutoPlay(false);
    if (e.touches[0]) {
      setDragStartY(e.touches[0].clientY);
      dragDistanceRef.current = 0;
      isDraggingRef.current = false;
    }
  };

  const handleTouchMove = (e) => {
    if (dragStartY === null || !e.touches[0]) return;
    const clientY = e.touches[0].clientY;
    const diffY = clientY - dragStartY;
    
    dragDistanceRef.current += Math.abs(diffY);
    if (dragDistanceRef.current > 6) {
      isDraggingRef.current = true;
    }

    const deltaAngle = -diffY * 0.007;
    setScrollAngle((prev) => prev + deltaAngle);
    setDragStartY(clientY);
  };

  // Navigate to explicit memory representational gateway page on click
  const handleDoorClick = (memory) => {
    if (isDraggingRef.current) return;
    navigate(`/memory/${memory.id}`);
  };

  const renderCarouselContent = () => {
    if (memories.length === 0) return null;
    
    const visiblePortals = [];
    const isSmallScreen = dimensions.width < 768;

    // Distribute user's real memories across 3 tracks/columns
    const colDoors = [[], [], []];
    memories.forEach((memory, idx) => {
      colDoors[idx % 3].push(memory);
    });

    // Define columns relative coordinates (Left column, Center column, Right column)
    const trackXPositions = isSmallScreen 
      ? [3, 38, 73]  // Mobile percentages
      : [15, 43, 70]; // Desktop percentages

    // Custom boundaries for floating/scrolling to prevent edge issues
    const minY = -75;
    const maxY = 75;
    const viewportRange = maxY - minY;

    for (let t = 0; t < 3; t++) {
      const columnMemories = colDoors[t];
      const K = columnMemories.length;
      if (K === 0) continue;

      // Spacing of 105% ensures high-clearance spatial distance so they never vertical pile
      const D = 105;
      const cyRange = Math.max(180, K * D);

      for (let j = 0; j < K; j++) {
        const memory = columnMemories[j];
        const basePhase = j * D;

        // Custom auto-drifts based on track indexes
        let displacement = 0;
        if (t === 0) {
          displacement = -scrollAngle * 15; // Slow  upward flow
        } else if (t === 1) {
          displacement = scrollAngle * 12;  // Smooth downward flow
        } else {
          displacement = -scrollAngle * 15; // Slow upward flow
        }

        // endless looping logic inside the cyRange cylinder space
        const rawY = ((basePhase + displacement) % cyRange + cyRange) % cyRange;

        // Scale raw percentage to the display viewport coordinates
        const y_percent = minY + (rawY / cyRange) * viewportRange;

        // Calculate proximity to viewport center to drive focus and opacity
        const distFromCenter = Math.abs(y_percent - 50);
        
        // At center factor=1.0. At margins (distance = 95), factor smoothly transitions to 0.0
        const factor = Math.max(0, 1 - distFromCenter / 95);

        // Derive structural attributes based on focus factor - scaled up and less blurred to be more visible
        const scale = isSmallScreen ? (0.45 + 0.25 * factor) : (0.65 + 0.35 * factor);
        const opacity = Math.pow(factor, 1.0);
        const blur = (1 - factor) * 4.0; // Reduced blur to keep them prominent and mysterious
        const zIndex = Math.round(factor * 100);

        visiblePortals.push({
          memory,
          trackIdx: t,
          doorIdx: j,
          x: trackXPositions[t],
          y: y_percent,
          scale,
          opacity: Math.max(0, Math.min(1.0, opacity)),
          zIndex,
          blur,
        });
      }
    }

    return visiblePortals.map((portal) => (
      <FloatingDoor
        key={`portal-t${portal.trackIdx}-d${portal.doorIdx}-${portal.memory.id}`}
        memory={portal.memory}
        onClick={handleDoorClick}
        x={portal.x}
        y={portal.y}
        scale={portal.scale}
        opacity={portal.opacity}
        zIndex={portal.zIndex}
        blur={portal.blur}
      />
    ));
  };

  return (
    <div 
      className="flex-1 w-full h-[calc(100vh-160px)] md:h-[calc(100vh-130px)] relative overflow-hidden select-none flex flex-col justify-between px-2"
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUpOrLeave}
    >
      {/* Title Subheader HUD */}
      <div className="relative z-30 flex flex-col items-center text-center mt-3 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-1.5 px-3.5 py-1 border border-borderClr/25 bg-cardBg/45 rounded-full mb-3"
        >
          <span className="font-mono text-[8px] md:text-[9px] text-primaryText/60 uppercase tracking-[0.25em]">
            Corridors of Memory
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1 }}
          className="font-cinzel text-sm sm:text-base md:text-lg text-primaryText uppercase tracking-[0.2em] text-glow"
        >
          Palace Grounds
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="font-serif text-[10px] md:text-xs text-stone-300 mt-1.5 max-w-sm italic tracking-wide px-4"
        >
          Your personal gates of remembrance, revolving in an endless loop. Select an arch to revive your memory.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1.5, delay: 0.4 }}
          className="font-serif text-[10px] md:text-xs text-stone-300 mt-1.5 max-w-sm italic tracking-wide px-4"
        >
          <span>PORTALS BOUND: {memories.length}</span>
        </motion.p> 
      </div>

      {/* Floating Doors Canvas (Revolving carousel grounds) */}
      <div 
        ref={containerRef}
        className="flex-1 w-full relative z-20 min-h-[360px] cursor-grab active:cursor-grabbing"
      >
        <AnimatePresence>
          {loading ? null : memories.length === 0 ? (
            /* Empty/Fallback State styled inside a golden door archway */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10"
            >
              <div className="relative w-80 h-96 border border-borderClr/30 rounded-t-full bg-cardBg shadow-2xl p-8 flex flex-col items-center justify-center">
                <AlertCircle className="w-10 h-10 stroke-[1.2] text-primaryText/20 mb-4" />
                <h3 className="font-cinzel text-primaryText text-md uppercase tracking-[0.2em] mb-1">
                  Forgotten
                </h3>
                 <h4 className="font-cinzel text-stone-400 text-xs uppercase tracking-widest mb-4">
                  No Memories Yet!
                </h4>
                <p className="font-serif text-[11px] text-stone-400/80 italic max-w-xs leading-relaxed mb-8 px-2">
                  &ldquo;A silent library, its tall vaults empty. No memories have drifted into these gates yet.&rdquo;
                </p>
                <div className="flex flex-col gap-3 w-full max-w-[170px]">
                  <button onClick={() => navigate('/')} className="py-2.5 bg-transparent border border-borderClr/20 hover:border-borderClr/40 hover:bg-white/5 text-primaryText font-cinzel text-[10px] uppercase tracking-widest rounded transition-all cursor-pointer">
                    Go to Home
                  </button>
                  <button
                    onClick={() => navigate('/write')}
                    className="py-2.5 bg-[#17141A] hover:bg-[#1a171d] border border-borderClr/40 text-primaryText font-cinzel text-[10px] uppercase tracking-widest rounded transition-all cursor-pointer"
                  >
                    Write a Memory
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Render revolving carousel tracks content */
            renderCarouselContent()
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
