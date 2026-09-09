import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import { content } from "../data/content";

export default function IntroScreen({ onStart }) {
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    // Generate background decorations for the intro screen
    // Mix of emojis and the specific image sticker
    const items = Array.from({ length: 40 }).map((_, i) => {
      // 50% chance to be the image sticker, 50% chance to be an emoji
      const isImage = Math.random() > 0.5;
      const emojiTypes = ["🎈", "🎈", "👑", "⭐", "🎉"];
      
      return {
        id: i,
        isImage,
        value: isImage ? content.images.hero : emojiTypes[Math.floor(Math.random() * emojiTypes.length)],
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        rotation: Math.random() * 60 - 30,
        // Make the image stickers slightly larger than emojis
        scale: isImage ? Math.random() * 0.4 + 0.6 : Math.random() * 0.8 + 0.5,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
      };
    });
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
      <div className="absolute inset-0 pointer-events-none opacity-80">
        {decorations.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: 0 }}
            animate={{ 
              y: ["-15px", "15px", "-15px"],
              rotate: [item.rotation - 8, item.rotation + 8, item.rotation - 8]
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
              rotate: item.rotation
            }}
          >
            {item.isImage ? (
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 relative z-10 bg-white/60 p-12 rounded-3xl backdrop-blur-md border border-white/50 shadow-2xl"
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
