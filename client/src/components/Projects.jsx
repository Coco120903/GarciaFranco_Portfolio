import './projects.css'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Modal from './Modal'

const Projects = () => {
  const projectList = [
    {
      id: 4,
      title: "Batino's Garden Farm Resort",
      description: "A modern resort booking platform for events and celebrations. Features flexible booking options, package displays, and an image carousel showcasing facilities including spacious grounds, swimming pools, and event venues. Built with responsive design for a seamless booking experience across all devices.",
      tags: ["React", "CSS", "JavaScript", "Next.js"],
      image: "/images/BatinosResort.png",
      link: "https://batinos-garden-resort.vercel.app/"
    },
    {
      id: 5,
      title: "Custom Cursor Engine",
      description: "Multi-layer cursor with idle states, hover effects, and performance optimization.",
      tags: ["React", "CSS", "UX"],
      image: "https://via.placeholder.com/600x400?text=Cursor+Engine",
      link: "#"
    },
    {
      id: 6,
      title: "Scroll-Snap Portfolio",
      description: "Full-page scroll with snap sections, active nav tracking, and gradient separators.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "https://via.placeholder.com/600x400?text=Scroll+Portfolio",
      link: "#"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const [featuredOpen, setFeaturedOpen] = useState(false)
  const [batinosOpen, setBatinosOpen] = useState(false)
  const featuredProject = {
    title: 'Batino\'s Garden',
    subtitle: 'Thesis Project',
    description: 'A full-featured e-commerce gardening platform with advanced administrative controls, real-time customer communication, and end-to-end transactional workflows. The system includes a robust admin dashboard with analytics and inventory management, real-time chat for customer support, customizable product options such as pot selection, integrated online payments, and Google Maps–based location and delivery support. Built to support both operational efficiency and an enhanced user shopping experience.',
    image: '/images/BatinosThesis.png',
    link: 'https://batinosgarden.shop/',
    tags: ['JavaScript', 'React', 'Node.js', 'CSS', 'MongoDB']
  }

  const handleConfirmNavigate = () => {
    // open in new tab and close modal
    window.open(featuredProject.link, '_blank', 'noopener')
    setFeaturedOpen(false)
  }

  const handleBatinosNavigate = () => {
    // open in new tab and close modal
    window.open('https://batinos-garden-resort.vercel.app/', '_blank', 'noopener')
    setBatinosOpen(false)
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section className="section-projects" id="projects">
      <div className="projects-inner">
        <motion.div 
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="projects-eyebrow">Featured Works</p>
        </motion.div>

        {/* Featured thesis project - visually prioritized */}
        <motion.div
          className="featured-project-block"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setFeaturedOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') setFeaturedOpen(true) }}
        >
          <div className="featured-thumbnail">
            <img src={featuredProject.image} alt={featuredProject.title} loading="lazy" />
            <div className="featured-thumb-overlay" />
          </div>
          <div className="featured-info">
            <p className="featured-eyebrow">{featuredProject.subtitle}</p>
            <h3 className="featured-title">{featuredProject.title}</h3>
            <p className="featured-desc">{featuredProject.description}</p>
            <div className="project-tags">
              {featuredProject.tags.map((tag, idx) => (
                <span key={idx} className="project-tag">{tag}</span>
              ))}
            </div>
            <div className="featured-actions">
              <button className="featured-cta" onClick={(e) => { e.stopPropagation(); setFeaturedOpen(true) }}>View Thesis</button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="projects-divider" 
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectList.map((project, index) => {
            const isBatinos = project.id === 4
            return (
              <motion.div
                key={project.id}
                className="project-card"
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                }}
                onClick={() => isBatinos ? setBatinosOpen(true) : window.open(project.link, '_blank', 'noopener')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    isBatinos ? setBatinosOpen(true) : window.open(project.link, '_blank', 'noopener')
                  }
                }}
              >
                <div className="project-image-wrapper">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="project-overlay" />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="project-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        {/* Confirmation modal for featured project navigation */}
        <Modal isOpen={featuredOpen} onClose={() => setFeaturedOpen(false)} title={`Open ${featuredProject.title}?`}>
          <div style={{ padding: '1rem 1.25rem' }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}>
              You are about to leave this site and proceed to the featured thesis project: <strong>{featuredProject.title}</strong>.
            </p>
            <p style={{ marginTop: '0.6rem', color: 'rgba(255,255,255,0.8)' }}>
              Do you want to continue?
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button className="featured-cancel" onClick={() => setFeaturedOpen(false)}>Cancel</button>
              <button className="featured-confirm" onClick={handleConfirmNavigate}>Proceed</button>
            </div>
          </div>
        </Modal>
        {/* Confirmation modal for Batino's Garden Farm Resort project */}
        <Modal isOpen={batinosOpen} onClose={() => setBatinosOpen(false)} title="Open Batino's Garden?">
          <div style={{ padding: '1rem 1.25rem' }}>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)' }}>
              You are about to leave this site and proceed to: <strong>Batino's Garden Farm Resort</strong>.
            </p>
            <p style={{ marginTop: '0.6rem', color: 'rgba(255,255,255,0.8)' }}>
              Do you want to continue?
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
              <button className="featured-cancel" onClick={() => setBatinosOpen(false)}>Cancel</button>
              <button className="featured-confirm" onClick={handleBatinosNavigate}>Proceed</button>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  )
}

export default Projects
