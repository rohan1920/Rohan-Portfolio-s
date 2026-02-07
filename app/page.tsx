import LoadingScreen from '@/components/LoadingScreen'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SelectedWorks from '@/components/SelectedWorks'
import Services from '@/components/Services'
import ScrollingText from '@/components/ScrollingText'
import DefiningSyntax from '@/components/DefiningSyntax'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative z-10">
      <CustomCursor />
      <LoadingScreen />
      <div className="relative z-20">
        <Navigation />
        <Hero />
        <SelectedWorks />
        <Services />
        <ScrollingText />
        <DefiningSyntax />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
