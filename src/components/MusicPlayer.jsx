import { useEffect, useRef } from "react";
import { Music, Pause } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicPlayer({ isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.log("Audio play failed, likely due to browser policies.", e));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 
        NOTE: You will need to add a "birthday-song.mp3" file inside public/ 
        For now this is a placeholder path.
      */}
      <audio 
        ref={audioRef} 
        src="/birthday-song.mp3" 
        loop 
      />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsPlaying(!isPlaying)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg text-white transition-colors ${
          isPlaying ? 'bg-primary' : 'bg-gray-800'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Pause size={24} />
            <span className="absolute -top-2 -right-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
        ) : (
          <Music size={24} />
        )}
      </motion.button>
    </div>
  );
}
