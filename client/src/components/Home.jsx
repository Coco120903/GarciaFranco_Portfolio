
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.png';
import './HomeDim.css';

const Home = ({ phase, tilt, setTilt }) => {
  // Show dim overlay only the first time Franco.dev appears centered
  const [showDim, setShowDim] = useState(false);
  const [fadeDim, setFadeDim] = useState(false);
  const shownOnce = useRef(false);
  const [showGlow, setShowGlow] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const glowTimerRef = useRef(null);

  useEffect(() => {
    if (phase === 1 && !shownOnce.current) {
      setShowDim(true);
      shownOnce.current = true;
    }
    if (phase === 2 && showDim) {
      setFadeDim(true);
      // Remove overlay after fade
      const t = setTimeout(() => setShowDim(false), 1600);
      return () => clearTimeout(t);
    }
  }, [phase]);
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
    <main id="home">
      {showDim && (
        <div className={`dim-overlay${fadeDim ? ' dim-fadeout' : ''}`}></div>
      )}
      <motion.h1
        className={`portfolio-title ${showGlow ? 'portfolio-title-glow' : ''}`}
        initial={{ opacity: 0, top: '70%', left: '50%', x: '-50%', scale: 1 }}
        animate={phase === 1 ? { opacity: 1, top: '50%', left: '50%', x: '-50%', scale: isClicked ? 1.05 : 1 } : phase === 2 ? { opacity: 0, top: '50%', left: '50%', x: '-50%', scale: 1 } : { scale: isClicked ? 1.05 : 1 }}
        transition={{ 
          opacity: { duration: 1, ease: 'linear' }, 
          top: { duration: 1, ease: 'easeOut' }, 
          left: { duration: 1, ease: 'easeOut' }, 
          x: { duration: 1, ease: 'easeOut' }, 
          fontSize: { duration: 1, ease: 'easeOut' }, 
          scale: { duration: 0.3, ease: 'easeOut' } 
        }}
        onClick={() => {
          if (glowTimerRef.current) {
            clearTimeout(glowTimerRef.current);
          }
          setIsClicked(true);
          setShowGlow(true);
          glowTimerRef.current = setTimeout(() => {
            setIsClicked(false);
            setShowGlow(false);
            glowTimerRef.current = null;
          }, 1500);
        }}
        style={{ cursor: 'pointer' }}
      >
        Franco.dev
      </motion.h1>
      <motion.img
        src={profileImage}
        alt="Profile"
        className="profile-image"
        loading="eager"
        fetchPriority="high"
        initial={{ opacity: 0, top: '100%', left: '50%', x: '-50%', y: '-50%' }}
        animate={phase === 2 ? { opacity: 1, top: '50%', left: '50%', x: '-50%', y: '-50%' } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{ position: 'absolute', transformStyle: 'preserve-3d', transformOrigin: 'center', rotateX: tilt.x, rotateY: tilt.y }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5
          setTilt({ x: y * -10, y: x * 16 })
        }}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      />
      {phase >= 2 && (
        <motion.div
          className="intro-block"
          variants={introContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div className="intro-hello" variants={introItem}>
            <span className="hello-white">Hello,</span>
            <span className="hello-iam">I am</span>
          </motion.div>
          <motion.div className="intro-name" variants={introItem}>
            <span className="name-line line-1">Franco</span>
            <span className="name-line line-2">Garcia</span>
          </motion.div>
          <motion.div className="intro-role" variants={introItem}>
            Developer & UI/UX Designer
          </motion.div>
        </motion.div>
      )}
      {phase >= 2 && (
        <motion.div
          className="home-social-buttons"
          variants={introContainer}
          initial="hidden"
          animate="show"
        >
          <motion.a
            href="https://www.instagram.com/coco__grc/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-btn home-social-instagram"
            variants={introItem}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://www.facebook.com/franco.garcia.958618/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-btn home-social-facebook"
            variants={introItem}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://github.com/Coco120903"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-btn home-social-github"
            variants={introItem}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/franco-angelov-e-garcia-2530933a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-btn home-social-linkedin"
            variants={introItem}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </motion.div>
      )}
      {phase >= 2 && (
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 1.5 }}
        >
          <p className="scroll-text">Explore</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            className="scroll-arrow"
          >
            ↓
          </motion.div>
        </motion.div>
      )}
      <div className="landing-content">
        {/* Add more content here */}
      </div>
    </main>
  )
}

export default Home
