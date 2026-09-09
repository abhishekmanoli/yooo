import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function BirthdayHero({ content }) {
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center pt-20">
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-6xl md:text-8xl font-handwritten text-primary mb-12 text-center drop-shadow-md cursor-pointer relative z-20"
        onClick={triggerConfetti}
      >
        HAPPY BIRTHDAY! 🎂
      </motion.h1>

      <div className="relative group cursor-pointer z-10" onClick={triggerConfetti}>
        {/* Irregular white border cutout effect */}
        <motion.div 
          whileHover={{ rotate: 2, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative rounded-2xl p-3 bg-white scrapbook-shadow transform rotate-[-2deg]"
        >
          <img 
            src={content.images.hero} 
            alt="Hero" 
            className="w-64 h-80 object-cover rounded-xl"
          />
          
          {/* Decorative Stickers attached to Hero */}
          <div className="absolute -top-6 -right-6 text-4xl animate-bounce">👑</div>
          <div className="absolute -bottom-4 -left-4 text-3xl">⭐</div>
          <div className="absolute top-1/2 -right-12 bg-accent px-3 py-1 font-handwritten text-sm transform rotate-[15deg] shadow-sm rounded-sm">
            Main Character
          </div>
          <div className="absolute bottom-1/4 -left-10 bg-secondary text-white px-3 py-1 font-handwritten text-sm transform rotate-[-10deg] shadow-sm rounded-sm">
            Favorite Person ❤️
          </div>
        </motion.div>
      </div>
    </section>
  );
}
