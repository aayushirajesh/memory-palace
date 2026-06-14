import React, { useEffect, useStat } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MemoryViewer } from '../components/MemoryViewer';
import { Ghost, Landmark, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from "../context/AuthContext";
import { fetchMemories, deleteMemory } from "../services/memoryService";
import { useState } from "react";

export default function MemoryPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const memory = memories.find((m) => m.id === id);  // Find exact memory representation from existing cache

  useEffect(() => { 
    async function fetchData() { 
      try { 
        const data = await fetchMemories(); 
        setMemories(data); 
      }
      finally { 
        setLoading(false);
      }
    } 
    fetchData(); 
  }, []);

  const handleBack = () => {
    navigate('/memorywall');
  };

  const handleDissolve = async (memoId) => {
    await deleteMemory(memoId);
    navigate('/memorywall');
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center">
        <p className="font-cinzel text-primaryText/60 uppercase tracking-[0.3em]">
          Reviving Memory...
        </p>
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center select-none relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-cardBg border border-borderClr/30 rounded-md p-10 max-w-sm shadow-xl"
        >
          <Ghost className="w-12 h-12 stroke-[1.2] text-primaryText/25 mb-4 mx-auto" />
          <h2 className="font-cinzel text-primaryText text-sm uppercase tracking-widest mb-2">
            Dispersed Fragment
          </h2>
          <p className="font-serif text-xs text-stone-400 italic leading-relaxed mb-6">
            This gate is empty. The memory has dissolved back into the cosmic sea, or has not yet been inscribed.
          </p>
          <button onClick={handleBack} className="px-5 py-2 border border-borderClr/20 hover:bg-white/5 text-primaryText font-cinzel text-xs uppercase tracking-widest rounded-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 mx-auto">
            <ArrowLeft className="w-4 h-4" />
            Wander Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 py-4 md:py-8">
      <MemoryViewer
        memory={memory}
        user={user}
        onBack={handleBack}
        onDissolve={handleDissolve}
      />
    </div>
  );
}
