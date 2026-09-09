import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function CharacterCards({ eras }) {
  const [selectedEra, setSelectedEra] = useState(null);

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-handwritten mb-2">Same Person.</h2>
        <h3 className="text-2xl font-sans font-bold text-gray-400 uppercase tracking-widest">Different Vibes</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {eras.map((era) => (
          <motion.div
            key={era.id}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedEra(era)}
            className="w-40 bg-white rounded-xl p-3 scrapbook-shadow cursor-pointer relative group border border-gray-100"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3 relative">
              <img src={era.src} alt={era.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
            
            <div className="text-center">
              <p className="text-xs text-secondary font-bold mb-1">🔓 UNLOCKED</p>
              <h4 className="text-sm font-bold leading-tight">{era.title}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEra && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEra(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-6 md:p-10 max-w-lg w-full relative flex flex-col items-center"
            >
              <button onClick={() => setSelectedEra(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
                <X size={24} />
              </button>
              
              <img src={selectedEra.src} alt={selectedEra.title} className="w-64 h-64 object-cover rounded-2xl shadow-lg mb-6 transform -rotate-2" />
              
              <h3 className="text-3xl font-bold mb-2 text-center">{selectedEra.title}</h3>
              <p className="text-lg text-gray-600 text-center font-handwritten">{selectedEra.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
