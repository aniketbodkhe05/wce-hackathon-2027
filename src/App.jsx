import { useState, useEffect } from 'react';
import { GlobalScene } from './components/GlobalScene';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Highlights } from './sections/Highlights';
import { Challenges } from './sections/Challenges';
import { Timeline } from './sections/Timeline';
import { Prizes } from './sections/Prizes';
import { Sponsors } from './sections/Sponsors';
import { Journey } from './sections/Journey';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    // Ensure preloader doesn't stick around too long
    const safety = setTimeout(() => setPreloaderDone(true), 8000);
    return () => clearTimeout(safety);
  }, []);

  const handlePreloaderComplete = () => {
    setPreloaderDone(true);
  };

  if (!preloaderDone) {
    return (
      <div className="bg-[#07090d]">
        <Preloader onComplete={handlePreloaderComplete} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#07090d] text-[#f2f5f7] overflow-x-clip">
      <GlobalScene />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Highlights />
        <Challenges />
        <Timeline />
        <Prizes />
        <Sponsors />
        <Journey />
        <FAQ />
        <FinalCTA />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
