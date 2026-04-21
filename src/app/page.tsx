import GlobalCoaster from '@/components/3d/GlobalCoaster'
import SmoothScroll from '@/components/layout/SmoothScroll'
import SvgFilters from '@/components/layout/SvgFilters'
import LoadingScreen from '@/components/layout/LoadingScreen'
import Cursor from '@/components/ui/Cursor'
import SideRail from '@/components/layout/SideRail'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import About from '@/components/sections/About'
import Work from '@/components/sections/Work'
import OffTheClock from '@/components/sections/OffTheClock'
import Stack from '@/components/sections/Stack'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <GlobalCoaster />
      <SvgFilters />
      <SmoothScroll />
      <LoadingScreen />
      <Cursor />
      <SideRail />
      <main id="top" className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Work />
        <Stack />
        <OffTheClock />
        <Contact />
      </main>
    </>
  )
}
