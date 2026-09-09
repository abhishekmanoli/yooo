import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function GiftSection({ gifts }) {
  const [openedGifts, setOpenedGifts] = useState([]);

  const openGift = (index, isSecret) => {
    if (!openedGifts.includes(index)) {
      setOpenedGifts([...openedGifts, index]);
      confetti({
        particleCount: isSecret ? 150 : 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: isSecret ? ['#ffe66d', '#ff6b6b'] : ['#4ecdc4', '#ffffff']
      });
    }
  };

  return (
    <section className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-handwritten mb-2">There are a few gifts hidden here...</h2>
        <p className="text-gray-500 font-sans">Click to open them 🎁</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {gifts.map((gift, i) => {
          const isOpen = openedGifts.includes(i);
          
          return (
            <div key={i} className="relative w-40 h-40 flex items-center justify-center">
              {!isOpen ? (
                <motion.button
                  whileHover={{ scale: 1.1, rotate: [-5, 5, -5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => openGift(i, gift.isSecret)}
                  className="text-6xl drop-shadow-lg"
                >
                  {gift.icon}
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`absolute inset-0 flex items-center justify-center text-center p-4 rounded-xl shadow-lg ${gift.isSecret ? 'bg-accent border-4 border-primary/20' : 'bg-white'}`}
                >
                  <p className={`font-bold ${gift.isSecret ? 'text-primary text-sm' : 'text-sm text-gray-700'}`}>
                    {gift.text}
                  </p>
                  {gift.isSecret && (
                    <div className="absolute -top-3 -right-3 text-2xl">⭐</div>
                  )}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
