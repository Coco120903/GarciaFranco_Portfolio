import { motion } from 'framer-motion'

const Header = ({ phase, activeSection }) => {
  return (
    <header className="navbar">
      <motion.a 
        href="#home"
        className="logo" 
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }} 
        transition={{ duration: 1 }}
        style={{ opacity: phase >= 2 ? 1 : 0 }}
      >
        {phase >= 2 ? "Franco.dev" : ""}
      </motion.a>
      <nav className="nav-links">
        <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
        <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
        <a href="#achievements" className={activeSection === 'achievements' ? 'active' : ''}>Achievements</a>
        <a href="#connect" className={activeSection === 'connect' ? 'active' : ''}>Connect</a>
      </nav>
    </header>
  )
}

export default Header