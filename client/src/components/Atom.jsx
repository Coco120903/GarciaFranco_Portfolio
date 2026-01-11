import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import './atom.css'

const Atom = () => {
  const atomRef = useRef(null)
  const wrapperRef = useRef(null)
  const [activeParticle, setActiveParticle] = useState(null)
  const [isNearAtom, setIsNearAtom] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  
  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobile(isMobileDevice)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Pause animations when off-screen for better performance
  useEffect(() => {
    if (!atomRef.current) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    
    observer.observe(atomRef.current)
    return () => observer.disconnect()
  }, [])

  // Advanced spring physics for ultra-smooth motion - optimized for mobile
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  // Less intensive spring config on mobile for better performance
  const springConfig = useMemo(() => (
    isMobile
      ? { stiffness: 50, damping: 30, mass: 1.2 }
      : { stiffness: 80, damping: 25, mass: 0.8 }
  ), [isMobile])
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

  // Language data with enhanced visual properties
  const languages = useMemo(() => ([
        {
          name: 'Dart',
          color: '#0175C2',
          glowColor: 'rgba(1, 117, 194, 0.8)',
          secondaryColor: '#005fa3',
          orbit: 4,
          delay: 5,
          icon: (
            <svg viewBox="0 0 128 128" className="tech-icon dart-icon">
              <g>
                <polygon fill="#0175C2" points="24,104 72,8 120,56 72,120"/>
                <polygon fill="#13B9FD" points="72,8 120,56 72,56"/>
                <polygon fill="#13B9FD" points="24,104 72,56 24,56"/>
                <polygon fill="#055A8C" points="72,120 24,104 72,56"/>
                <polygon fill="#29C9F8" points="72,56 120,56 72,120" opacity="0.7"/>
                <polygon fill="#29C9F8" points="24,56 72,56 120,56 72,8" opacity="0.5"/>
              </g>
            </svg>
          )
        },
        {
          name: 'Flutter',
          color: '#02569B',
          glowColor: 'rgba(2, 86, 155, 0.8)',
          secondaryColor: '#13B9FD',
          orbit: 4,
          delay: 5.5,
          icon: (
            <svg viewBox="0 0 256 256" className="tech-icon flutter-icon">
              <g>
                {/* Main diagonal bar */}
                <polygon fill="#47C5FB" points="67,220 157,130 200,130 110,220"/>
                {/* Middle diagonal bar */}
                <polygon fill="#47C5FB" points="200,44 157,44 67,134 110,134"/>
                {/* Lower right overlay */}
                <polygon fill="#00569B" points="200,224 157,224 110,177 153,177"/>
                {/* Overlay for intersection */}
                <polygon fill="#00B5F8" opacity="0.7" points="153,177 110,177 200,87 243,87"/>
              </g>
            </svg>
          )
        },
    {
      name: 'React',
      color: '#61DAFB',
      glowColor: 'rgba(97, 218, 251, 0.8)',
      secondaryColor: '#21a9d4',
      orbit: 0,
      delay: 0,
      icon: (
        <svg viewBox="-11.5 -10.5 23 21" className="tech-icon react-icon">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.2"/>
            <ellipse rx="10" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="10" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      color: '#F7DF1E',
      glowColor: 'rgba(247, 223, 30, 0.8)',
      secondaryColor: '#c4af00',
      orbit: 1,
      delay: 0.5,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon js-icon">
          <path fill="currentColor" d="M1.408 1.408h125.184v125.185H1.408z"/>
          <path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/>
        </svg>
      )
    },
    {
      name: 'CSS3',
      color: '#264DE4',
      glowColor: 'rgba(38, 77, 228, 0.8)',
      secondaryColor: '#1a35a3',
      orbit: 2,
      delay: 1,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon css-icon">
          <path fill="#1572B6" d="M18.814 114.123L8.76 1.352h110.48l-10.064 112.754-45.243 12.543z"/>
          <path fill="#33A9DC" d="M64.001 117.062l36.559-10.136 8.601-96.354h-45.16z"/>
          <path fill="#fff" d="M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711-3.4 38.114H64.001z"/>
          <path fill="#EBEBEB" d="M64.083 87.349l-.061.018-15.403-4.159-.985-11.031H33.752l1.937 21.717 28.331 7.863.063-.018z"/>
          <path fill="#fff" d="M81.127 64.675l-1.666 18.522-15.426 4.164v14.39l28.354-7.858.208-2.337 2.406-26.881z"/>
          <path fill="#EBEBEB" d="M64.048 23.435v13.831H30.64l-.277-3.108-.63-7.012-.331-3.711zm-.047 27.996v13.831H48.792l-.277-3.108-.631-7.012-.331-3.711z"/>
        </svg>
      )
    },
    {
      name: 'HTML5',
      color: '#E44D26',
      glowColor: 'rgba(228, 77, 38, 0.8)',
      secondaryColor: '#b33a1a',
      orbit: 0,
      delay: 1.5,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon html-icon">
          <path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/>
          <path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/>
          <path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/>
          <path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/>
        </svg>
      )
    },
    {
      name: 'Node.js',
      color: '#539E43',
      glowColor: 'rgba(83, 158, 67, 0.8)',
      secondaryColor: '#3d7530',
      orbit: 1,
      delay: 2,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon node-icon">
          <path fill="#83CD29" d="M64 128c-1.8 0-3.5-.5-5-1.3L44.6 118c-2.4-1.3-1.2-1.8-.4-2.1 3-.9 3.6-1.2 6.9-2.9.3-.2.7-.1 1 .1l11.5 6.8c.4.2 1 .2 1.4 0l44.8-25.9c.4-.2.7-.7.7-1.2V41.1c0-.5-.3-1-.7-1.2L65 14c-.4-.2-1-.2-1.4 0L18.8 39.9c-.4.2-.7.7-.7 1.2v51.7c0 .5.3 1 .7 1.2l12.3 7.1c6.7 3.3 10.8-.6 10.8-4.5V46c0-.7.6-1.3 1.3-1.3h5.5c.7 0 1.3.6 1.3 1.3v50.5c0 8.8-4.8 13.9-13.2 13.9-2.6 0-4.6 0-10.3-2.8l-11.8-6.8c-3.1-1.8-5-5.1-5-8.7V41.1c0-3.6 1.9-6.9 5-8.7L59 6.5c3-1.7 7-1.7 10 0l44.8 25.9c3.1 1.8 5 5.1 5 8.7v51.7c0 3.6-1.9 6.9-5 8.7L69 127.4c-1.5.9-3.2 1.3-5 1.3z"/>
          <path fill="#83CD29" d="M79.4 95c-19.5 0-23.6-9-23.6-16.5 0-.7.6-1.3 1.3-1.3h5.6c.6 0 1.2.5 1.3 1.1.9 6 3.5 9 15.5 9 9.5 0 13.6-2.2 13.6-7.2 0-2.9-1.2-5.1-16-6.6-12.4-1.2-20-4-20-13.8 0-9.1 7.7-14.5 20.6-14.5 14.5 0 21.7 5 22.6 15.8 0 .4-.1.7-.4 1-.3.3-.6.4-1 .4h-5.6c-.6 0-1.1-.4-1.3-1-1.4-6.3-4.9-8.3-14.4-8.3-10.6 0-11.8 3.7-11.8 6.5 0 3.4 1.5 4.4 15.5 6.3 13.8 1.9 20.5 4.5 20.5 14 0 9.8-8.2 15.4-22.4 15.4z"/>
        </svg>
      )
    },
    {
      name: 'SQL',
      color: '#336791',
      glowColor: 'rgba(51, 103, 145, 0.8)',
      secondaryColor: '#1f4b6d',
      orbit: 3,
      delay: 2.5,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon sql-icon">
          <path fill="#336791" d="M64 8c-30.9 0-56 10.7-56 24v64c0 13.3 25.1 24 56 24 3.1 0 6.1-.1 9-.3l14.6 14.6c1.2 1.2 2.8 1.7 4.4 1.7s3.2-.6 4.4-1.7c2.4-2.4 2.4-6.4 0-8.8l-8.9-8.9C105.5 110.4 120 100.5 120 96V32c0-13.3-25.1-24-56-24zm0 12c25.4 0 44 8.4 44 12s-18.6 12-44 12S20 35.6 20 32s18.6-12 44-12zm44 76c0 3.6-18.6 12-44 12s-44-8.4-44-12V48.5c10.4 6.9 27.1 11.5 44 11.5s33.6-4.6 44-11.5V96z"/>
          <text x="64" y="82" fill="#336791" fontSize="32" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">SQL</text>
        </svg>
      )
    },
    {
      name: 'C#',
      color: '#68217A',
      glowColor: 'rgba(104, 33, 122, 0.8)',
      secondaryColor: '#4a1857',
      orbit: 2,
      delay: 3,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon csharp-icon">
          <path fill="#68217A" d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.8 0-1.7-.4-2.6z"/>
          <path fill="#fff" d="M64.1 90.3c-14.4 0-26.1-11.7-26.1-26.1s11.7-26.1 26.1-26.1c9.3 0 17.9 4.9 22.6 12.9l-13 7.5c-2.4-4-6.6-6.4-11.3-6.4-7.3 0-13.2 5.9-13.2 13.2s5.9 13.2 13.2 13.2c4.6 0 8.9-2.4 11.3-6.4l13 7.5c-4.8 7.9-13.5 10.7-22.6 10.7z"/>
          <path fill="#fff" d="M89.2 71.4h-4.5v-4.5h-4.4v4.5h-4.5v4.4h4.5v4.5h4.4v-4.5h4.5z"/>
          <path fill="#fff" d="M105.1 71.4h-4.5v-4.5h-4.4v4.5h-4.5v4.4h4.5v4.5h4.4v-4.5h4.5z"/>
        </svg>
      )
    },
    {
      name: 'Java',
      color: '#007396',
      glowColor: 'rgba(0, 115, 150, 0.8)',
      secondaryColor: '#00526a',
      orbit: 0,
      delay: 3.5,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon java-icon">
          <path fill="#0074BD" d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"/>
          <path fill="#EA2D2E" d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.629-29.58.001.001-42.701 10.674-22.318 34.187z"/>
          <path fill="#0074BD" d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"/>
          <path fill="#EA2D2E" d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"/>
          <path fill="#0074BD" d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 0 2.875 2.381 17.647 3.331z"/>
        </svg>
      )
    },
    {
      name: 'MongoDB',
      color: '#00ED64',
      glowColor: 'rgba(0, 237, 100, 0.8)',
      secondaryColor: '#00c24e',
      orbit: 1,
      delay: 4,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon mongodb-icon">
          <path fill="#00ED64" d="M64 8L64 120C64 120 45 105 45 70C45 35 64 8 64 8Z"/>
          <path fill="#47A248" d="M64 8L64 120C64 120 83 105 83 70C83 35 64 8 64 8Z"/>
          <path fill="#B8C4C2" d="M62 95L66 95L66 120L62 120Z"/>
        </svg>
      )
    },
    {
      name: 'Express.js',
      color: '#FFFFFF',
      glowColor: 'rgba(255, 255, 255, 0.8)',
      secondaryColor: '#888888',
      orbit: 3,
      delay: 4.5,
      icon: (
        <svg viewBox="0 0 128 128" className="tech-icon express-icon">
          <text x="64" y="72" fill="currentColor" fontSize="36" fontWeight="bold" textAnchor="middle" fontFamily="Arial, sans-serif">ex</text>
        </svg>
      )
    }
  ]), [])

  // Enhanced orbital configurations
  const orbits = useMemo(() => ([
    { rotateX: 72, rotateY: 0, rotateZ: 0, duration: 18, radius: 165, direction: 1, thickness: 2.5 },
    { rotateX: 0, rotateY: 72, rotateZ: 55, duration: 24, radius: 165, direction: -1, thickness: 2 },
    { rotateX: 40, rotateY: 50, rotateZ: 110, duration: 28, radius: 165, direction: 1, thickness: 1.8 },
    { rotateX: 60, rotateY: 30, rotateZ: 20, duration: 32, radius: 165, direction: -1, thickness: 1.5 },
    { rotateX: 45, rotateY: -60, rotateZ: 60, duration: 36, radius: 165, direction: 1, thickness: 1.3 }
  ]), [])

  // Energy beams from nucleus - reduced on mobile for performance
  const energyBeams = useMemo(() => {
    const count = isMobile ? 6 : 12
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i / count) * 360,
      length: 60 + Math.random() * 50,
      duration: 2.5 + Math.random() * 2,
      delay: i * 0.25
    }))
  }, [isMobile])

  // Throttle mouse move for better performance
  const mouseMoveTimeoutRef = useRef(null)
  
  const handleMouseMove = useCallback((e) => {
    if (!atomRef.current || !wrapperRef.current || isMobile || !isVisible) return
    
    // Throttle mouse move events for better performance
    if (mouseMoveTimeoutRef.current) {
      return
    }
    
    mouseMoveTimeoutRef.current = requestAnimationFrame(() => {
      const wrapperRect = wrapperRef.current.getBoundingClientRect()
      const centerX = wrapperRect.left + wrapperRect.width / 2
      const centerY = wrapperRect.top + wrapperRect.height / 2
      
      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      
      const proximityThreshold = 320
      const near = distance < proximityThreshold
      
      // Avoid re-rendering every mousemove: only update state when it changes
      setIsNearAtom((prev) => (prev === near ? prev : near))

      if (near) {
        const x = (e.clientX - wrapperRect.left) / wrapperRect.width - 0.5
        const y = (e.clientY - wrapperRect.top) / wrapperRect.height - 0.5
        const proximityFactor = 1 - (distance / proximityThreshold)
        mouseX.set(x * proximityFactor)
        mouseY.set(y * proximityFactor)
      } else {
        mouseX.set(0)
        mouseY.set(0)
      }
      
      mouseMoveTimeoutRef.current = null
    })
  }, [isMobile, isVisible, mouseX, mouseY])

  const handleMouseLeave = useCallback(() => {
    if (mouseMoveTimeoutRef.current) {
      cancelAnimationFrame(mouseMoveTimeoutRef.current)
      mouseMoveTimeoutRef.current = null
    }
    mouseX.set(0)
    mouseY.set(0)
    setIsNearAtom(false)
  }, [mouseX, mouseY])

  return (
    <div
      ref={atomRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="atom-main-container"
    >
      {/* Language List - Left Side */}
      <motion.div 
        className="tech-list-container"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="tech-list-title">Core Technology Stack</h3>
        <ul className="tech-list">
          {languages.map((lang, index) => (
            <motion.li
              key={lang.name}
              className={`tech-list-item ${activeParticle === lang.name ? 'active' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setActiveParticle(lang.name)}
              onMouseLeave={() => setActiveParticle(null)}
              style={{ '--item-color': lang.color }}
            >
              <span className="tech-list-icon" style={{ color: lang.color }}>
                {lang.icon}
              </span>
              <span className="tech-list-name">{lang.name}</span>
              <span className="tech-list-indicator" style={{ background: lang.color }} />
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Atom Container - Right Side */}
      <div className="atom-container">
        {/* Ambient floating particles removed for performance */}

        {/* Background energy grid - reduced on mobile for performance */}
        {!isMobile && (
          <div className="energy-grid">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="grid-line horizontal"
                style={{
                  top: `${10 + i * 10}%`,
                  '--grid-dur': `${5 + i * 0.5}s`,
                  '--grid-delay': `${i * 0.2}s`,
                }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={i + 8}
                className="grid-line vertical"
                style={{
                  left: `${10 + i * 10}%`,
                  '--grid-dur': `${5 + i * 0.5}s`,
                  '--grid-delay': `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          ref={wrapperRef}
          className={`atom-wrapper ${isNearAtom ? 'near' : ''}`}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
        >
        {/* Outer aura glow - simplified on mobile */}
        <motion.div
          className="atom-aura aura-outer"
          animate={isVisible ? {
            scale: isMobile ? [1, 1.05, 1] : [1, 1.08, 1],
            opacity: isMobile ? [0.2, 0.25, 0.2] : [0.15, 0.3, 0.15]
          } : {}}
          transition={{
            duration: isMobile ? 8 : 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        {!isMobile && (
          <motion.div
            className="atom-aura aura-mid"
            animate={isVisible ? {
              scale: [1.05, 1.12, 1.05],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )}

        {/* Complex Multi-Layer Nucleus */}
        <div className="nucleus-container">
          {/* Outer glow layers - simplified on mobile */}
          <motion.div
            className="nucleus-glow nucleus-glow-outer"
            animate={isVisible ? {
              scale: isMobile ? [1, 1.3, 1] : [1, 1.5, 1],
              opacity: isMobile ? [0.3, 0.4, 0.3] : [0.2, 0.5, 0.2],
              rotate: isMobile ? 0 : [0, 180, 360]
            } : {}}
            transition={{
              duration: isMobile ? 10 : 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          {!isMobile && (
            <motion.div
              className="nucleus-glow nucleus-glow-mid"
              animate={isVisible ? {
                scale: [1.1, 1.4, 1.1],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, -120, -240]
              } : {}}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}
          <motion.div
            className="nucleus-glow nucleus-glow-inner"
            animate={isVisible ? {
              scale: isMobile ? [1, 1.15, 1] : [1, 1.25, 1],
              opacity: isMobile ? [0.6, 0.8, 0.6] : [0.5, 0.9, 0.5]
            } : {}}
            transition={{
              duration: isMobile ? 4 : 2.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          
          {/* Nucleus core with orbiting particles */}
          <div className="nucleus-core">
            {/* Outer proton ring - use CSS animation on mobile for better performance */}
            <motion.div
              className={`proton-ring proton-ring-outer ${isMobile ? 'css-rotate' : ''}`}
              animate={!isMobile && isVisible ? { rotate: 360 } : {}}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              {(isMobile ? [0, 1, 2, 3] : [0, 1, 2, 3, 4, 5, 6, 7]).map((i) => (
                <motion.div
                  key={i}
                  className={`proton proton-outer ${isMobile ? 'static-glow' : ''}`}
                  style={{
                    transform: `rotate(${i * (isMobile ? 90 : 45)}deg) translateX(18px)`
                  }}
                  animate={!isMobile && isVisible ? {
                    scale: [0.9, 1.15, 0.9],
                    boxShadow: [
                      '0 0 6px rgba(0, 212, 255, 0.5), inset 0 0 3px rgba(255, 255, 255, 0.3)',
                      '0 0 14px rgba(0, 212, 255, 1), inset 0 0 6px rgba(255, 255, 255, 0.7)',
                      '0 0 6px rgba(0, 212, 255, 0.5), inset 0 0 3px rgba(255, 255, 255, 0.3)'
                    ]
                  } : {}}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>

            {/* Inner proton ring - use CSS animation on mobile */}
            <motion.div
              className={`proton-ring proton-ring-inner ${isMobile ? 'css-rotate-reverse' : ''}`}
              animate={!isMobile && isVisible ? { rotate: -360 } : {}}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            >
              {(isMobile ? [0, 1, 2] : [0, 1, 2, 3, 4]).map((i) => (
                <motion.div
                  key={i}
                  className={`proton proton-inner ${isMobile ? 'static-glow' : ''}`}
                  style={{
                    transform: `rotate(${i * (isMobile ? 120 : 72)}deg) translateX(10px)`
                  }}
                  animate={!isMobile && isVisible ? {
                    scale: [1, 1.25, 1],
                    boxShadow: [
                      '0 0 8px rgba(0, 212, 255, 0.6), inset 0 0 4px rgba(255, 255, 255, 0.4)',
                      '0 0 18px rgba(0, 212, 255, 1), inset 0 0 8px rgba(255, 255, 255, 0.8)',
                      '0 0 8px rgba(0, 212, 255, 0.6), inset 0 0 4px rgba(255, 255, 255, 0.4)'
                    ]
                  } : {}}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </motion.div>
            
            {/* Central core sphere - simplified box-shadow on mobile */}
            <motion.div
              className={`core-center ${isMobile ? 'static-core-glow' : ''}`}
              animate={!isMobile && isVisible ? {
                boxShadow: [
                  '0 0 25px rgba(0, 212, 255, 0.7), 0 0 50px rgba(0, 212, 255, 0.4), 0 0 80px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.5)',
                  '0 0 40px rgba(0, 212, 255, 1), 0 0 80px rgba(0, 212, 255, 0.6), 0 0 120px rgba(0, 212, 255, 0.3), inset 0 0 25px rgba(255, 255, 255, 0.8)',
                  '0 0 25px rgba(0, 212, 255, 0.7), 0 0 50px rgba(0, 212, 255, 0.4), 0 0 80px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.5)'
                ],
                scale: [1, 1.08, 1]
              } : (isMobile && isVisible ? { scale: [1, 1.05, 1] } : {})}
              transition={{
                duration: isMobile ? 4 : 3,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              {/* Core inner highlight */}
              <div className="core-highlight" />
            </motion.div>
          </div>

          {/* Pulse waves - reduced on mobile */}
          {(isMobile ? [1] : [1, 2]).map((i) => (
            <motion.div
              key={i}
              className="nucleus-pulse"
              animate={isVisible ? {
                scale: [1, 3, 1],
                opacity: [0.4, 0, 0.4]
              } : {}}
              transition={{
                duration: isMobile ? 5 : 4,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>

        {/* Unified Orbital Systems */}
        {orbits.map((orbit, orbitIdx) => {
          const orbitParticles = languages.filter((lang) => lang.orbit === orbitIdx)
          
          return (
            <motion.div
              key={`orbital-system-${orbitIdx}`}
              className="orbital-system"
              style={{
                transform: `rotateX(${orbit.rotateX}deg) rotateY(${orbit.rotateY}deg) rotateZ(${orbit.rotateZ}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Rotating container - use CSS animation on mobile for better performance */}
              <motion.div
                className={`orbital-plane ${isMobile ? (orbit.direction > 0 ? 'css-orbit-cw' : 'css-orbit-ccw') : ''}`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  '--orbit-duration': `${orbit.duration}s`
                }}
                animate={!isMobile && isVisible ? {
                  rotateZ: [0, 360 * orbit.direction]
                } : {}}
                transition={{
                  duration: orbit.duration,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {/* Enhanced orbit ring with glow trail */}
                <svg className="orbit-ring-svg" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id={`orbitGrad-${orbitIdx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={orbitParticles[0]?.color || '#00d4ff'} stopOpacity="1" />
                      <stop offset="20%" stopColor="#00d4ff" stopOpacity="0.25" />
                      <stop offset="40%" stopColor={orbitParticles[1]?.color || '#00d4ff'} stopOpacity="1" />
                      <stop offset="60%" stopColor="#00d4ff" stopOpacity="0.25" />
                      <stop offset="80%" stopColor={orbitParticles[0]?.color || '#00d4ff'} stopOpacity="1" />
                      <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.25" />
                    </linearGradient>
                    <filter id={`glow-${orbitIdx}`} x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id={`innerGlow-${orbitIdx}`} x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.5" result="blur"/>
                      <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Outer glow ring */}
                  <circle
                    cx="200"
                    cy="200"
                    r={orbit.radius}
                    fill="none"
                    stroke={`url(#orbitGrad-${orbitIdx})`}
                    strokeWidth={orbit.thickness + 6}
                    filter={`url(#glow-${orbitIdx})`}
                    opacity="0.35"
                  />
                  {/* Main ring */}
                  <circle
                    cx="200"
                    cy="200"
                    r={orbit.radius}
                    fill="none"
                    stroke={`url(#orbitGrad-${orbitIdx})`}
                    strokeWidth={orbit.thickness}
                    filter={`url(#innerGlow-${orbitIdx})`}
                    opacity="1"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Particles on this orbit */}
                {orbitParticles.map((lang, idx) => {
                  const angle = (idx / orbitParticles.length) * 360

                  return (
                    <motion.div
                      key={lang.name}
                      className={`electron-container ${activeParticle === lang.name ? 'active' : ''}`}
                      style={{
                        transform: `rotate(${angle}deg) translateX(${orbit.radius}px)`,
                        transformStyle: 'preserve-3d'
                      }}
                      onHoverStart={() => setActiveParticle(lang.name)}
                      onHoverEnd={() => setActiveParticle(null)}
                    >
                      {/* Billboard effect - use CSS animation on mobile */}
                      <motion.div
                        className={`electron-billboard ${isMobile ? (orbit.direction > 0 ? 'css-orbit-ccw' : 'css-orbit-cw') : ''}`}
                        style={{ 
                          transformStyle: 'preserve-3d',
                          '--orbit-duration': `${orbit.duration}s`
                        }}
                        animate={!isMobile && isVisible ? {
                          rotateZ: [0, -360 * orbit.direction]
                        } : {}}
                        transition={{
                          duration: orbit.duration,
                          repeat: Infinity,
                          ease: 'linear'
                        }}
                      >
                        <div
                          className="electron-face"
                          style={{
                            transform: `
                              rotate(-${angle}deg)
                              rotateZ(-${orbit.rotateZ}deg)
                              rotateY(${-orbit.rotateY}deg)
                              rotateX(${-orbit.rotateX}deg)
                            `,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <motion.div
                            className="electron"
                            whileHover={!isMobile ? { scale: 1.25 } : {}}
                            transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                          >
                            {/* Subtle outer glow - hidden on mobile for performance */}
                            {!isMobile && (
                              <motion.div
                                className="electron-glow electron-glow-outer"
                                style={{
                                  background: `radial-gradient(circle, ${lang.color}15 30%, transparent 70%)`
                                }}
                                animate={isVisible ? {
                                  scale: [1.2, 1.5, 1.2],
                                  opacity: [0.25, 0.45, 0.25]
                                } : {}}
                                transition={{
                                  duration: 3.5,
                                  repeat: Infinity,
                                  delay: lang.delay,
                                  ease: 'easeInOut'
                                }}
                              />
                            )}
                            {!isMobile && (
                              <motion.div
                                className="electron-glow electron-glow-mid"
                                style={{
                                  background: `radial-gradient(circle, ${lang.color}20 35%, transparent 60%)`
                                }}
                                animate={isVisible ? {
                                  scale: [1.15, 1.35, 1.15],
                                  opacity: [0.3, 0.5, 0.3]
                                } : {}}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  delay: lang.delay + 0.2,
                                  ease: 'easeInOut'
                                }}
                              />
                            )}
                            {/* Inner glow - simplified on mobile */}
                            <motion.div
                              className="electron-glow electron-glow-inner"
                              style={{
                                background: `radial-gradient(circle, ${lang.color}${isMobile ? '40' : '30'} 40%, transparent 55%)`
                              }}
                              animate={isVisible ? {
                                scale: isMobile ? [1.1, 1.15, 1.1] : [1.1, 1.2, 1.1],
                                opacity: isMobile ? [0.4, 0.5, 0.4] : [0.35, 0.55, 0.35]
                              } : {}}
                              transition={{
                                duration: isMobile ? 3 : 1.8,
                                repeat: Infinity,
                                delay: lang.delay + 0.4,
                                ease: 'easeInOut'
                              }}
                            />

                            {/* 3D Sphere core - static box-shadow on mobile */}
                            <motion.div
                              className={`electron-core ${isMobile ? 'static-electron-glow' : ''}`}
                              style={{
                                '--glow-color': lang.color,
                                '--sphere-color': lang.color,
                                background: `
                                  radial-gradient(ellipse 70% 50% at 28% 22%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 55%),
                                  radial-gradient(ellipse 90% 70% at 75% 85%, ${lang.secondaryColor}99 0%, transparent 55%),
                                  radial-gradient(circle at 45% 45%, ${lang.color} 0%, ${lang.color}dd 25%, ${lang.secondaryColor} 65%, ${lang.secondaryColor}99 100%)
                                `,
                                borderColor: lang.color,
                              }}
                              animate={!isMobile && isVisible ? {
                                boxShadow: [
                                  `inset -6px -6px 15px rgba(0, 0, 0, 0.5), inset 4px 4px 10px rgba(255, 255, 255, 0.2), 0 0 15px ${lang.color}35, 0 0 25px ${lang.color}18, 0 4px 12px rgba(0, 0, 0, 0.35)`,
                                  `inset -6px -6px 15px rgba(0, 0, 0, 0.5), inset 4px 4px 10px rgba(255, 255, 255, 0.28), 0 0 22px ${lang.color}45, 0 0 35px ${lang.color}25, 0 4px 12px rgba(0, 0, 0, 0.35)`,
                                  `inset -6px -6px 15px rgba(0, 0, 0, 0.5), inset 4px 4px 10px rgba(255, 255, 255, 0.2), 0 0 15px ${lang.color}35, 0 0 25px ${lang.color}18, 0 4px 12px rgba(0, 0, 0, 0.35)`
                                ]
                              } : {}}
                              transition={{
                                duration: 3.5,
                                repeat: Infinity,
                                delay: lang.delay,
                                ease: 'easeInOut'
                              }}
                            >
                              <div
                                className="icon-wrapper"
                                style={{ color: 'white' }}
                              >
                                {lang.icon}
                              </div>
                            </motion.div>

                            {/* Particle trail - hidden on mobile */}
                            {!isMobile && (
                              <motion.div
                                className="electron-trail"
                                style={{
                                  background: `linear-gradient(90deg, ${lang.color} 0%, ${lang.color}66 30%, transparent 100%)`
                                }}
                                animate={isVisible ? {
                                  opacity: [0.25, 0.65, 0.25],
                                  scaleX: [0.6, 1.1, 0.6]
                                } : {}}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut'
                                }}
                              />
                            )}

                            {/* Hover label */}
                            <AnimatePresence>
                              {activeParticle === lang.name && (
                                <motion.div
                                  className="particle-label"
                                  initial={{ opacity: 0, y: 18, scale: 0.85 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                                  transition={{ duration: 0.25, ease: 'easeOut' }}
                                  style={{
                                    borderColor: lang.color,
                                    boxShadow: `0 0 25px ${lang.color}55, 0 0 50px ${lang.color}25, 0 6px 20px rgba(0, 0, 0, 0.35)`
                                  }}
                                >
                                  <span className="label-text">{lang.name}</span>
                                  <motion.span
                                    className="label-glow"
                                    style={{ background: lang.color }}
                                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                                    transition={{ duration: 1.8, repeat: Infinity }}
                                  />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
      </div>
    </div>
  )
}

export default Atom
