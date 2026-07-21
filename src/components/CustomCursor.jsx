import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef(null);

  const mouse = useRef({ x: 0, y: 0 });
  const cursor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    setIsTouchDevice(touch);

    if (touch) return;

    const moveCursor = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', moveCursor);

    let animationFrame;

    const animate = () => {
      cursor.current.x += (mouse.current.x - cursor.current.x) * 0.14;
      cursor.current.y += (mouse.current.y - cursor.current.y) * 0.14;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(
          ${cursor.current.x - 24}px,
          ${cursor.current.y - 24}px,
          0
        )`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div 
      ref={cursorRef}
      className='fixed top-0 left-0 z-9999 pointer-events-none w-12 h-12'
    >
      <div className='absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(231,211,168,0.08)_0%,rgba(231,211,168,0.02)_45%,transparent_70%)] blur-xs' />
      <div className='absolute left-1/2 top-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primaryText/55 bg-mainBg/25 shadow-[0_0_18px_rgba(231,211,168,0.18),inset_0_0_8px_rgba(231,211,168,0.08)] backdrop-blur-xs' />
      <div className='absolute left-1/2 top-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5E6C8] shadow-[0_0_10px_rgba(245,230,200,0.9)]' />
    </div>
  )
}
