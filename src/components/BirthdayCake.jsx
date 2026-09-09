import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdayCake() {
  const [candles, setCandles] = useState([true, true, true]); // true = lit
  const [wished, setWished] = useState(false);

  const blowCandle = (index) => {
    if (!candles[index]) return;
    
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);

    // If all candles blown out
    if (!newCandles.includes(true) && !wished) {
      setWished(true);
      setTimeout(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          });
          confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          });
        }, 250);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center py-12">
      {!wished ? (
        <h2 className="text-3xl md:text-4xl font-handwritten mb-12 text-center">Make a wish... 🎂</h2>
      ) : (
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-2 drop-shadow-md">WISH GRANTED ✨</h2>
          <p className="text-2xl font-handwritten text-gray-700">Happy Birthday ❤️</p>
        </motion.div>
      )}

      <div className="relative w-64 h-64 flex flex-col items-center justify-end">
        {/* Candles */}
        <div className="flex gap-4 mb-[-10px] z-10">
          {candles.map((isLit, i) => (
            <div 
              key={i} 
              className="relative w-4 h-16 bg-red-400 rounded-t-md border-2 border-red-500 cursor-pointer flex justify-center"
              onClick={() => blowCandle(i)}
            >
              {/* Flame */}
              {isLit && (
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [-2, 2, -2],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity,
                    delay: i * 0.2 
                  }}
                  className="absolute -top-6 w-4 h-6 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_10px_#ffe66d,0_0_20px_#ff9f43]"
                />
              )}
            </div>
          ))}
        </div>

        {/* Cake Layers */}
        <div className="w-48 h-12 bg-pink-300 rounded-t-xl border-b-4 border-pink-400 shadow-inner z-10" />
        <div className="w-56 h-16 bg-[#f4e4c1] rounded-t-xl border-b-4 border-[#e3d1a8] shadow-inner relative flex items-center justify-center">
          <div className="absolute w-full flex justify-around px-4">
             <div className="w-2 h-2 rounded-full bg-pink-400"></div>
             <div className="w-2 h-2 rounded-full bg-pink-400"></div>
             <div className="w-2 h-2 rounded-full bg-pink-400"></div>
             <div className="w-2 h-2 rounded-full bg-pink-400"></div>
          </div>
        </div>
        <div className="w-64 h-20 bg-pink-400 rounded-t-xl rounded-b-md border-b-8 border-pink-500 shadow-xl" />
        
        {/* Plate */}
        <div className="w-72 h-4 bg-gray-200 rounded-full mt-2 shadow-md" />
      </div>
      
      {!wished && (
        <p className="mt-8 text-sm text-gray-500 font-sans italic">
          (Tap the candles to blow them out)
        </p>
      )}
    </div>
  );
}
