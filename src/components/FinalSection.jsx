import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function FinalSection({ closing }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const [unlocked, setUnlocked] = useState(false);

  const triggerFinale = () => {
    setUnlocked(true);
    
    // Massive confetti
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 100 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  return (
    <motion.section 
      style={{ opacity }}
      className="relative min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white overflow-hidden py-20 px-4"
    >
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center space-y-12 max-w-2xl">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400"
        >
          HAPPY BIRTHDAY ❤️
        </motion.h1>

        <motion.p 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-handwritten text-gray-300 leading-relaxed"
        >
          Here's to another year of memories, adventures, chaos and everything in between.
        </motion.p>

        {!unlocked ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            onClick={triggerFinale}
            className="mt-12 px-8 py-4 border-2 border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all font-bold tracking-widest uppercase text-sm"
          >
            One last surprise ✨
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.6 }}
            className="mt-12 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            <h2 className="text-3xl font-handwritten text-pink-300">{closing}</h2>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
