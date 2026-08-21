import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import Leadership from "./components/Leadership";
import Achievements from "./components/Achievements";
import Skills from "./components/Skills";
import Challenges from "./components/Challenges";
import CEOFit from "./components/CEOFit";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative font-body text-ivory antialiased">
      <div className="ambient-bg" aria-hidden="true" />
      <div className="noise-overlay" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Timeline />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="ruled" />
        </div>
        <Leadership />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="ruled" />
        </div>
        <Achievements />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="ruled" />
        </div>
        <Skills />
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="ruled" />
        </div>
        <Challenges />
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="ruled" />
        </div>
        <CEOFit />
      </main>
      <Footer />
    </div>
  );
}
