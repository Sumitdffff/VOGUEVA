import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Ring from "./components/Ring.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Process from "./components/Process.jsx";
import Faq from "./components/Faq.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Viewer from "./components/Viewer.jsx";
import { PHOTOS } from "./data/photos.js";

export default function App() {
  const [paused, setPaused] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(null);

  return (
    <>
      <div className="noise" />
      <Header paused={paused} onToggle={() => setPaused((p) => !p)} />
      <main>
        <Hero />
        <Ring
          photos={PHOTOS}
          paused={paused || viewerIndex !== null}
          onOpen={setViewerIndex}
        />
        <Work photos={PHOTOS} onOpen={setViewerIndex} />
        <About photos={PHOTOS} />
        <Services />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <Viewer
        photos={PHOTOS}
        index={viewerIndex}
        onChange={setViewerIndex}
        onClose={() => setViewerIndex(null)}
      />
    </>
  );
}
