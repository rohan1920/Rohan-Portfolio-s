import LoadingScreen from '@/components/LoadingScreen'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import SelectedWorks from '@/components/SelectedWorks'
import Services from '@/components/Services'
import ScrollingText from '@/components/ScrollingText'
import DefiningSyntax from '@/components/DefiningSyntax'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <LoadingScreen />
      <Navigation />
      <Hero />
      <SelectedWorks />
      <Services />
      <ScrollingText />
      <DefiningSyntax />
      <Contact />
      <Footer />
    </main>
  )
}
