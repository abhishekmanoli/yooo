import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/outline";

export default function BeforeAfter({ child, current }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - left;
    const pos = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(pos);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl md:text-5xl font-handwritten mb-4 text-center">
        FROM THIS LITTLE GUY...
      </h2>
      <h2 className="text-xl md:text-3xl font-handwritten mb-8 text-primary text-center">
        ...TO THIS GUY. 😎
      </h2>
      
      <div className="relative group w-full max-w-lg aspect-square rounded-2xl overflow-hidden scrapbook-shadow border-8 border-white"
           ref={containerRef}
           onMouseMove={handleMove}
           onTouchMove={handleMove}
      >
        {/* Child image (Background) */}
        <img 
          src={child} 
          alt="Childhood" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Current image (Foreground clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={current} 
            alt="Current" 
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: '100%', maxWidth: 'none', objectFit: 'cover' }}
            // We need to keep the image width constant while the container width changes
            // To prevent squishing, we can use object-cover but ensure it stretches to parent's original width.
            // Actually, setting width to container's width is tricky in CSS without specific values.
          />
          {/* Workaround for clipping mask approach in React without complex CSS: */}
          <div className="absolute inset-0 w-[500px] h-[500px] md:w-[512px] md:h-[512px]">
             <img src={current} alt="Current" className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Actual Clipping Mask Approach */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
           <img src={current} alt="Current" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-10"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center text-white transform -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>
          </div>
        </div>
      </div>
      
      <p className="mt-6 font-handwritten text-gray-600 transform rotate-2">
        "Character development: 10/10"
      </p>
    </div>
  );
}
