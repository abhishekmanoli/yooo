import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BirthdayLetter({ letter, name }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-12 flex flex-col items-center">
      <h2 className="text-3xl font-handwritten mb-12 text-center">A Little Something For You 💌</h2>

      <div className="relative w-full max-w-2xl cursor-pointer perspective-[1000px]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsOpen(true)}
              className="bg-[#f4e4c1] p-12 rounded-xl border-2 border-[#e3d1a8] shadow-md flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Envelope flap effect */}
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-white/30 transform origin-top rotate-[-10deg] scale-150 shadow-sm" />
              <div className="absolute top-0 left-0 right-0 h-1/2 border-b-2 border-white/30 transform origin-top rotate-[10deg] scale-150 shadow-sm" />
              
              <div className="relative z-10 w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-3xl shadow-md border-4 border-red-700/50 mb-4">
                ❤️
              </div>
              <p className="font-handwritten text-xl text-gray-800 relative z-10">OPEN LETTER</p>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="bg-[#fffcf2] p-8 md:p-12 rounded-sm scrapbook-shadow border border-gray-200 relative origin-top bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 rotate-[-2deg] border border-gray-200/50 shadow-sm z-10" />
              
              <div className="font-handwritten text-lg md:text-xl text-gray-800 leading-relaxed whitespace-pre-line space-y-6">
                <p className="font-bold text-2xl">{letter.greeting.replace("[NAME]", name)}</p>
                <h3 className="text-3xl text-primary">{letter.title}</h3>
                <p>{letter.body}</p>
                <p className="mt-8 font-bold text-right">{letter.closing}</p>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="absolute top-4 right-4 text-sm text-gray-400 hover:text-gray-600"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
