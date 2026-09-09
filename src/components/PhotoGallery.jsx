import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PhotoGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-handwritten text-gray-800">The Archives 📸</h2>
      </div>

      <div className="flex flex-wrap justify-center gap-8 relative">
        {gallery.map((item, i) => {
          // Calculate random rotations for scrapbook feel
          const rotation = (i % 2 === 0 ? 1 : -1) * (Math.random() * 6 + 2);
          const yOffset = i % 2 !== 0 ? 20 : 0;

          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              style={{ rotate: rotation, y: yOffset }}
              className="bg-white p-4 pb-12 rounded-sm scrapbook-shadow cursor-pointer w-48 h-56 relative group"
              onClick={() => setSelectedImage(item)}
            >
              {/* Tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-sm rotate-[-3deg] border border-gray-200/50 shadow-sm z-10" />
              
              <img 
                src={item.src} 
                alt="gallery item" 
                className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-300"
              />
              <p className="absolute bottom-4 left-0 w-full text-center font-handwritten text-sm text-gray-700 px-2">
                {item.caption}
              </p>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          >
            <button className="absolute top-8 right-8 text-white hover:text-primary transition-colors">
              <X size={32} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative bg-white p-6 pb-16 rounded-md max-w-2xl max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt="Enlarged" 
                className="w-full h-full object-contain max-h-[60vh]"
              />
              <p className="absolute bottom-6 left-0 w-full text-center font-handwritten text-2xl text-gray-800">
                {selectedImage.caption}
              </p>
              
              {/* Decorative elements on modal */}
              <div className="absolute -top-8 -left-8 text-5xl animate-spin-slow">⭐</div>
              <div className="absolute -bottom-6 -right-6 text-5xl">❤️</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
