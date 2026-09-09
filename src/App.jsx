import { useState, useEffect } from "react";
import IntroScreen from "./components/IntroScreen";
import BirthdayHero from "./components/BirthdayHero";
import PhotoGallery from "./components/PhotoGallery";
import BeforeAfter from "./components/BeforeAfter";
import CharacterCards from "./components/CharacterCards";
import Quiz from "./components/Quiz";
import GiftSection from "./components/GiftSection";
import BirthdayLetter from "./components/BirthdayLetter";
import MemoryTimeline from "./components/MemoryTimeline";
import BirthdayCake from "./components/BirthdayCake";
import FinalSection from "./components/FinalSection";
import MusicPlayer from "./components/MusicPlayer";
import StickerLayer from "./components/StickerLayer";
import { content } from "./data/content";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [isStarted]);

  if (!isStarted) {
    return <IntroScreen onStart={() => {
      setIsStarted(true);
      setIsPlaying(true);
    }} />;
  }

  return (
    <div className="relative min-h-screen bg-paper text-ink overflow-x-hidden font-sans">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 md:w-[600px] md:h-[600px] bg-pink-300 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-80 h-80 md:w-[500px] md:h-[500px] bg-yellow-300 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 md:w-[600px] md:h-[600px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-blob animation-delay-4000"></div>
      </div>

      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <StickerLayer />

      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-12 space-y-32">
        <BirthdayHero content={content} />
        
        {/* Section 2: Blue sky + clouds vibes */}
        <div className="relative bg-blue-50/50 rounded-3xl p-8 scrapbook-shadow">
          <PhotoGallery gallery={content.images.gallery} />
        </div>
        
        <BeforeAfter 
          child={content.images.childhood} 
          current={content.images.current} 
        />
        
        <CharacterCards eras={content.images.eras} />
        
        {/* Section 4: Cream paper with doodles */}
        <div className="relative bg-[#fffdf0] rounded-3xl p-8 scrapbook-shadow border border-dashed border-gray-300">
          <Quiz questions={content.quiz} />
        </div>
        
        <GiftSection gifts={content.gifts} />
        
        <BirthdayLetter letter={content.letter} name={content.name} />
        
        <MemoryTimeline timeline={content.images.timeline} />
        
        {/* Birthday Party background */}
        <div className="relative bg-pink-50/50 rounded-3xl p-8 scrapbook-shadow">
          <BirthdayCake />
        </div>
        
      </main>

      <FinalSection closing={content.letter.closing} />
    </div>
  );
}

export default App;
