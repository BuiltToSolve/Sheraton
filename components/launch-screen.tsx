'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export function LaunchScreen() {
  const [mounted, setMounted] = useState(false);
  const [isLit, setIsLit] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Only show launch screen if not already launched in this session
    if (!sessionStorage.getItem('app-launched')) {
      setMounted(true);
    }
  }, []);

  const handleLight = () => {
    if (isLit) return;
    setIsLit(true);
    
    // After candle burns for a bit, reveal the background
    setTimeout(() => {
      setIsRevealed(true);
    }, 3000); 
    
    // Unmount the whole launch screen
    setTimeout(() => {
      setMounted(false);
      sessionStorage.setItem('app-launched', 'true');
    }, 6000); 
  };

  // Pre-hide scroll while launch screen is active
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mounted]);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-black overflow-hidden cursor-none"
          onMouseMove={handleMouseMove}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <motion.div 
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1, filter: 'brightness(0) blur(10px)' }}
            animate={{ 
              opacity: isRevealed ? 1 : isLit ? 0.3 : 0,
              scale: isRevealed ? 1 : 1.05,
              filter: isRevealed ? 'brightness(1) blur(0px)' : isLit ? 'brightness(0.4) blur(4px)' : 'brightness(0) blur(10px)'
            }}
            transition={{ duration: 2.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <Image 
              src="/images/banner2.png"
              alt="Welcome to Sheraton"
              fill
              className="object-cover md:hidden"
              priority
            />
            <Image 
              src="/images/launchimage.png"
              alt="Welcome to Sheraton"
              fill
              className="object-cover hidden md:block"
              priority
            />
          </motion.div>

          {/* Glowing Radial Gradient from Candle */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-[15]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLit && !isRevealed ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{
              background: 'radial-gradient(circle at center, rgba(255,200,100,0.15) 0%, rgba(0,0,0,0) 60%)'
            }}
          />

          {/* The Candle Wrapper */}
          <motion.div 
            className="relative z-20 flex flex-col items-center justify-end h-[300px]"
            animate={{
              opacity: isRevealed ? 0 : 1,
              scale: isRevealed ? 1.5 : 1,
              y: isRevealed ? -50 : 0
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {/* Flame */}
            <div 
              className="relative w-16 h-20 flex justify-center mb-0 pb-1 cursor-none z-40"
              onClick={handleLight}
            >
              <AnimatePresence>
                {isLit && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: -5,
                      scale: [1, 1.1, 0.9, 1.05, 1],
                      rotate: [-1, 2, -2, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.8,
                      scale: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.15 + Math.random() * 0.1
                      },
                      rotate: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 0.2 + Math.random() * 0.1
                      }
                    }}
                    className="absolute bottom-0 w-8 h-14 bg-gradient-to-t from-blue-500 via-yellow-200 to-orange-500 rounded-full blur-[1px] origin-bottom shadow-[0_0_60px_20px_rgba(253,224,71,0.6)]"
                    style={{ borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%' }}
                  />
                )}
              </AnimatePresence>
              {/* Wick */}
              <div className="absolute bottom-0 w-1.5 h-4 bg-neutral-900 rounded-t-sm" />
            </div>

            {/* Candle Body */}
            <div className="relative w-20 h-40 rounded-sm shadow-2xl flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-300 via-white to-neutral-400 rounded-sm" />
              {/* Warm glow on top of the wax if lit */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-orange-300/40 to-transparent rounded-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLit ? 1 : 0 }}
                transition={{ duration: 1 }}
              />
              
              {/* Melted wax top */}
              <div className="absolute -top-1.5 w-full h-4 bg-gradient-to-r from-neutral-200 via-white to-neutral-300 rounded-[50%]" />
              
              {/* Drips */}
              <div className="absolute top-2 left-3 w-2 h-10 bg-white rounded-full opacity-80" />
              <div className="absolute top-1 right-4 w-2 h-14 bg-white rounded-full opacity-80" />
              <div className="absolute top-4 right-8 w-1.5 h-6 bg-white rounded-full opacity-80" />
            </div>

            {!isLit && (
              <motion.div 
                className="absolute -bottom-16 text-white/60 tracking-[0.3em] uppercase text-xs font-light"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                Tap to Ignite
              </motion.div>
            )}
          </motion.div>

          {/* Custom Flame Cursor */}
          {!isRevealed && (
            <motion.div
              className="fixed top-0 left-0 pointer-events-none z-[1000]"
              animate={{ 
                x: mousePos.x - 10, 
                y: mousePos.y - 15 
              }}
              transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 0.9, 1.1, 1],
                  rotate: [-5, 5, -3, 3, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 0.5
                }}
                className="w-5 h-8 bg-gradient-to-t from-blue-400 via-yellow-200 to-orange-500 rounded-full blur-[1px] shadow-[0_0_15px_5px_rgba(253,224,71,0.6)]"
                style={{ borderRadius: '50% 50% 20% 20% / 60% 60% 40% 40%' }}
              />
            </motion.div>
          )}

          {/* Final white flash/glow to transition to the actual site */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div 
                className="absolute inset-0 bg-white/40 z-[100] pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 2.5, times: [0, 0.5, 1], ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
