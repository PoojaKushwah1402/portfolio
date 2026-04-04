import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Expertise from '@/components/Expertise'
import Projects from '@/components/Projects'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Expertise />
        <Projects />
        <About />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
