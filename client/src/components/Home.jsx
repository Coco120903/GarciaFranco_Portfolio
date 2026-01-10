
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import profileImage from '../assets/profile.png';
import './HomeDim.css';

const Home = ({ phase, tilt, setTilt }) => {
  // Show dim overlay only the first time Franco.dev appears centered
  const [showDim, setShowDim] = useState(false);
  const [fadeDim, setFadeDim] = useState(false);
  const shownOnce = useRef(false);

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
        className="portfolio-title"
        initial={{ opacity: 0, top: '70%', left: '50%', x: '-50%' }}
        animate={phase === 1 ? { opacity: 1, top: '50%', left: '50%', x: '-50%' } : phase === 2 ? { opacity: 0, top: '50%', left: '50%', x: '-50%' } : {}}
        transition={{ opacity: { duration: 1, ease: 'linear' }, top: { duration: 1, ease: 'easeOut' }, left: { duration: 1, ease: 'easeOut' }, x: { duration: 1, ease: 'easeOut' }, fontSize: { duration: 1, ease: 'easeOut' } }}
      >
        Franco.dev
      </motion.h1>
      <motion.img
        src={profileImage}
        alt="Profile"
        className="profile-image"
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
