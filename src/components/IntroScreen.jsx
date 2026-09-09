import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function IntroScreen({ onStart }) {
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
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fdfbf7] z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8"
      >
        <div className="space-y-2">
          <h2 className="text-2xl md:text-4xl font-handwritten text-gray-700">Hey... 👀</h2>
          <p className="text-lg md:text-xl text-gray-500 font-sans">I made something for you.</p>
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
          className="text-sm text-gray-400 italic"
        >
          Okay... now don't rush. Explore everything.
        </motion.p>
      </motion.div>
    </div>
  );
}
