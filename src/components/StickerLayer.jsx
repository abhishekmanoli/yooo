import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { content } from "../data/content";

export default function StickerLayer() {
  const [stickers, setStickers] = useState([]);

  useEffect(() => {
    // Generate random stickers across the document height
    const emojiTypes = ["⭐", "❤️", "🎈", "✨", "🎉", "👑", "🍕"];
    const specificImage = content.images.hero; // The kid with the party hat collage
    
    const newStickers = Array.from({ length: 40 }).map((_, i) => {
      // 30% chance to be the photo sticker
      const isImage = Math.random() > 0.7;
      
      return {
        id: i,
        isImage,
        value: isImage ? specificImage : emojiTypes[Math.floor(Math.random() * emojiTypes.length)],
        top: Math.random() * 95 + 2 + "%", // Random percentage top to bottom
        left: Math.random() > 0.5 ? Math.random() * 15 + "%" : (85 + Math.random() * 15) + "%", // Push to edges
        rotation: Math.random() * 60 - 30,
        scale: isImage ? Math.random() * 0.3 + 0.8 : Math.random() * 0.5 + 0.8,
      };
    });
    setStickers(newStickers);
  }, []);

  const handleStickerClick = (e, value) => {
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
          className="absolute drop-shadow-sm cursor-pointer pointer-events-auto hover:drop-shadow-lg"
          style={{ 
            top: sticker.top, 
            left: sticker.left,
            rotate: sticker.rotation,
            scale: sticker.scale
          }}
          whileHover={{ scale: sticker.scale * 1.2, rotate: sticker.rotation + 10 }}
          whileTap={{ scale: sticker.scale * 0.9 }}
          onClick={(e) => handleStickerClick(e, sticker.value)}
        >
          {sticker.isImage ? (
            <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-md bg-white">
              <img 
                src={sticker.value} 
                alt="Sticker" 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <span className="text-4xl">{sticker.value}</span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
