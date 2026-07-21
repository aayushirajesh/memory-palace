import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {MemoryEditor} from "../components/MemoryEditor";
import { createMemory } from "../services/memoryService";

export default function WriteMemory() {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  async function handleSave(title, content, imageBase64, mood) {
    try { 
      await createMemory({
        title,
        content,
        imageBase64,
        mood,
      }); 
      navigate("/memorywall"); 
    } catch (error) { 
      console.error(error); 
      setError(error.message);
      setTimeout(()=>{
        setError(null);
      }, 3000);
    }
  }

  function handleCancel() {
    navigate("/memorywall");
  }

  return (
    <div className="flex-1 w-full flex flex-col justify-center py-6 md:py-12 px-4 relative z-10 select-none">
      {error && (
          <div className="fixed top-1 z-50 animate-in fade-in slide-in-from-top duration-300 w-full flex justify-center px-6">
            <Card errorMsg={error} />
          </div>
        )}
      <MemoryEditor
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}