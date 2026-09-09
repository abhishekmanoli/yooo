import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

export default function IntroScreen({ onStart }) {
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    // Generate background decorations favoring the specific image
    const specificImage = "/images/ac0c543a-d0c7-47a8-b579-7a29a5ce9870.jpeg";
    const emojiTypes = ["🎈", "🎈", "⭐", "✨", "🎉"];
    
    // Grid-based even scattering
    const cols = 10;
    const rows = 8;
    const items = [];
    
    let idCounter = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // 85% chance to be the specific image
        const isImage = Math.random() > 0.15;
        
        // Calculate cell position (percentage)
        const cellWidth = 100 / cols;
        const cellHeight = 100 / rows;
        
        // Add random jitter within the cell
        const jitterX = Math.random() * cellWidth * 0.8;
        const jitterY = Math.random() * cellHeight * 0.8;
        
        const top = (r * cellHeight) + jitterY;
        const left = (c * cellWidth) + jitterX;

        items.push({
          id: idCounter++,
          isImage,
          value: isImage ? specificImage : emojiTypes[Math.floor(Math.random() * emojiTypes.length)],
          top: `${top}%`,
          left: `${left}%`,
          rotation: Math.random() * 80 - 40,
          scale: isImage ? Math.random() * 0.4 + 0.8 : Math.random() * 0.5 + 0.7, // 0.8 to 1.2
          opacity: 1, // fully visible
          delay: Math.random() * 2,
          duration: Math.random() * 4 + 3,
          yRange: Math.random() * 20 + 10,
        });
      }
    }
    setDecorations(items);
  }, []);

  const handleStart = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ffffff']
    });
    onStart();
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fdfbf7] z-50 overflow-hidden">
      {/* Decorative Background Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {decorations.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: 0 }}
            animate={{ 
              y: [`-${item.yRange}px`, `${item.yRange}px`, `-${item.yRange}px`],
              rotate: [item.rotation - 10, item.rotation + 10, item.rotation - 10]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
            className="absolute drop-shadow-lg"
            style={{ 
              top: item.top, 
              left: item.left,
              scale: item.scale,
              opacity: item.opacity,
              rotate: item.rotation
            }}
          >
            {item.isImage ? (
              <div className="w-24 h-24 rounded-full border-[3px] border-white overflow-hidden shadow-xl bg-white transform transition-transform">
                <img 
                  src={item.value} 
                  alt="Sticker" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <span className="text-5xl">{item.value}</span>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center space-y-8 relative z-10 bg-white/70 p-12 md:px-16 md:py-14 rounded-3xl backdrop-blur-xl border border-white/60 shadow-2xl"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-handwritten text-gray-800 font-bold">Hey... 👀</h2>
          <p className="text-lg md:text-xl text-gray-700 font-sans font-medium">I made something for you.</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStart}
          className="px-8 py-4 bg-primary text-white text-xl font-bold rounded-full shadow-[0_4px_14px_0_rgba(255,107,107,0.39)] hover:shadow-[0_6px_20px_rgba(255,107,107,0.23)] transition-all duration-200"
        >
          OPEN YOUR SURPRISE 🎁
        </motion.button>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-sm text-gray-600 italic font-medium"
        >
          Okay... now don't rush. Explore everything.
        </motion.p>
      </motion.div>
    </div>
  );
}
