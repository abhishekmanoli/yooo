import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function StickerLayer() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    // Generate random stickers across the document height
    const types = ["⭐", "❤️", "🎈", "✨", "🎉", "👑", "🍕"];
    const newStickers = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      top: Math.random() * 90 + 5 + "%", // Random percentage top to bottom
      left: Math.random() > 0.5 ? Math.random() * 10 + "%" : (80 + Math.random() * 10) + "%", // Push to edges
      rotation: Math.random() * 40 - 20,
      scale: Math.random() * 0.5 + 0.8,
    }));
    setStickers(newStickers);
  }, []);

  const handleStickerClick = (e, type) => {
    // Pop/sparkle effect on click
    const rect = e.target.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x, y },
      colors: ['#ff6b6b', '#ffe66d'],
      ticks: 40,
      gravity: 0.5,
      scalar: 0.6
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {stickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          className="absolute text-4xl drop-shadow-sm cursor-pointer pointer-events-auto hover:drop-shadow-lg"
          style={{ 
            top: sticker.top, 
            left: sticker.left,
            rotate: sticker.rotation,
            scale: sticker.scale
          }}
          whileHover={{ scale: sticker.scale * 1.2, rotate: sticker.rotation + 10 }}
          whileTap={{ scale: sticker.scale * 0.9 }}
          onClick={(e) => handleStickerClick(e, sticker.type)}
        >
          {sticker.type}
        </motion.div>
      ))}
    </div>
  );
}
