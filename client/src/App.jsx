import { motion } from 'framer-motion'
import { useState, useEffect, lazy, Suspense } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'

// Lazy load About, Achievements, and Projects sections for performance
const About = lazy(() => import('./components/About.jsx'))
const Achievements = lazy(() => import('./components/Achievements.jsx'))
const Projects = lazy(() => import('./components/Projects.jsx'))
const Connect = lazy(() => import('./components/Connect.jsx'))

function App() {
  const [phase, setPhase] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState('home')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isIdle, setIsIdle] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    setPhase(1)
  }, [])

  useEffect(() => {
    if (phase === 1) {
      const timer = setTimeout(() => setPhase(2), 1000)
      return () => clearTimeout(timer)
    }
  }, [phase])

      useEffect(() => {
    let ticking = false
    let rafId = null

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const homeSection = document.querySelector('main')
          const aboutSection = document.querySelector('.section-two')
          const projectsSection = document.querySelector('.section-projects')
          const achievementsSection = document.querySelector('.achievements-section')
          const connectSection = document.querySelector('.connect-section')
        
          if (homeSection && aboutSection && projectsSection) {
            const homeRect = homeSection.getBoundingClientRect()
            const aboutRect = aboutSection.getBoundingClientRect()
            const projectsRect = projectsSection.getBoundingClientRect()
            const achievementsRect = achievementsSection?.getBoundingClientRect()
            
            // Determine which section is in view
            if (homeRect.top >= -homeRect.height / 2 && homeRect.top <= window.innerHeight / 2) {
              setActiveSection('home')
            } else if (aboutRect.top >= -aboutRect.height / 2 && aboutRect.top <= window.innerHeight / 2) {
              setActiveSection('about')
            } else if (projectsRect.top >= -projectsRect.height / 2 && projectsRect.top <= window.innerHeight / 2) {
              setActiveSection('projects')
            } else if (achievementsRect && achievementsRect.top >= -achievementsRect.height / 2 && achievementsRect.top <= window.innerHeight / 2) {
              setActiveSection('achievements')
            } else if (connectSection) {
              const connectRect = connectSection.getBoundingClientRect()
              if (connectRect.top >= -connectRect.height / 2 && connectRect.top <= window.innerHeight / 2) {
                setActiveSection('connect')
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    let idleTimer
    let animationFrameId
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    const lerpFactor = 0.35 // Responsiveness factor (higher = more responsive)

    const animate = () => {
      // Smooth interpolation using lerp with higher factor for less delay
      const dx = targetX - currentX
      const dy = targetY - currentY
      
      // Use distance-based adaptive lerp for better responsiveness
      const distance = Math.sqrt(dx * dx + dy * dy)
      const adaptiveFactor = distance > 10 ? lerpFactor * 1.5 : lerpFactor
      
      currentX += dx * adaptiveFactor
      currentY += dy * adaptiveFactor
      
      setCursorPos({ x: currentX, y: currentY })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      setIsIdle(false)
      
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        setIsIdle(true)
      }, 1000)
    }

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .clickable, .logo')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest('a, button, .clickable, .logo')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(idleTimer)
    }
  }, [])

  const introContainer = {
    hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.2,
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const introItem = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  }

  return (
    <div className="App">
      {/* Custom Cursor */}
      <div 
        className={`custom-cursor ${isIdle ? 'idle' : ''} ${isHovering ? 'hover' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      >
        <div className="cursor-dot"></div>
        <div className="cursor-outline"></div>
        <div className="cursor-ring"></div>
      </div>
      
      <Header phase={phase} activeSection={activeSection} />
      
      <Home phase={phase} tilt={tilt} setTilt={setTilt} />
      
      <Suspense fallback={<div style={{ minHeight: '70vh', background: '#000000' }} />}>
        <About />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '70vh', background: '#000000' }} />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<div style={{ minHeight: '70vh', background: '#000000' }} />}>
        <Achievements />
      </Suspense>
      
      <Suspense fallback={<div style={{ minHeight: '70vh', background: '#000000' }} />}>
        <Connect />
      </Suspense>
      
      <Footer />
    </div>
  )
}

export default App