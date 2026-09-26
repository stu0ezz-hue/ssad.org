import { LanguageProvider, useLang } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About, MissionVision, AreasOfWork } from "./components/TopSections";
import { Programs, Impact, Stories } from "./components/MiddleSections";
import { Partners, CTA, Contact } from "./components/BottomSections";
import { Footer } from "./components/Footer";

function SkipLink() {
  const { t } = useLang();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:start-4 focus:z-[100] focus:bg-white focus:text-navy-900 focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
    >
      {t.a11y.skipToContent}
    </a>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <SkipLink />
        <Header />
        <main id="main" className="flex-1">
          <Hero />
          <About />
          <MissionVision />
          <AreasOfWork />
          <Programs />
          <Impact />
          <Stories />
          <Partners />
          <CTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
