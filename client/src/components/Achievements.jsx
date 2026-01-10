import { motion } from 'framer-motion'
import { useState, useMemo, useCallback } from 'react'
import Modal from './Modal'
import Icon from './Icon'
import './achievements.css'

// Optimized animation variants - defined outside component to prevent recreation
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 }
}

const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 }
}

const Achievements = () => {
  const [hoveredCert, setHoveredCert] = useState(null)

  // Memoized callbacks for hover handlers
  const handleCertHover = useCallback((idx) => setHoveredCert(idx), [])
  const handleCertLeave = useCallback(() => setHoveredCert(null), [])
  const handleView = useCallback((cert) => {
    // Placeholder action — can be replaced with modal or external link
    // Keeps behavior simple and visible during development
    // eslint-disable-next-line no-alert
    // open modal if cert has pdf property, otherwise show simple alert
    if (cert.pdf) {
      setModalCert(cert)
      setModalOpen(true)
      return
    }
    alert(`${cert.title} — ${cert.issuer}`)
  }, [])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalCert, setModalCert] = useState(null)

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setModalCert(null)
  }, [])

  // Static data - memoized
  const education = useMemo(() => [
    {
      school: 'De La Salle University-Dasmarinas',
      degree: 'BS in Information Technology',
      years: '2022 - 2026',
      status: 'current',
      achievement: 'With High Honors',
      description: 'Comprehensive IT curriculum covering software development, database management, and system design.',
      highlights: [
        "Dean's Lister - 1st Year (1st & 2nd Sem)",
        "Dean's Lister - 2nd Year (1st & 2nd Sem)",
        "Dean's Lister - 3rd Year (1st & 2nd Sem)",
        "Dean's Lister - 4th Year (1st & 2nd Sem)"
      ]
    },
    {
      school: 'Lyceum of Alabang',
      degree: 'Senior High School - TVL-ICT',
      years: '2020 - 2022',
      status: 'completed',
      achievement: 'With High Honors',
      description: 'Technical-Vocational-Livelihood (TVL) - Information and Communications Technology track with focus on applied IT skills and practical computing.',
      highlights: ['With High Honors Graduate']
    }
  ], [])

  const certifications = useMemo(() => [
    {
      type: 'certificate',
      title: 'Introduction to Cybersecurity',
      description: 'Cisco NetAcad',
      issuedOn: 'Oct 01, 2024',
      issuer: 'Cisco NetAcad',
      // Add `pdf` pointing to where you'd place the certificate file in `public/certificates/`
      // e.g. '/certificates/GarciaFranco_Introduction_to_Cybersecurity_certificate_gfe0725-dlsud-edu-ph.pdf'
      pdf: '/certificates/GarciaFranco_Introduction_to_Cybersecurity_certificate_gfe0725-dlsud-edu-ph.pdf',
      iconType: 'certificate',
      iconName: 'shield',
      color: '#00d4ff'
    },
    {
      type: 'achievement',
      title: 'Cybersecurity Administration (Module)',
      description: 'Cisco NetAcad',
      issuedOn: 'Oct 01, 2024',
      issuer: 'Cisco NetAcad',
      iconType: 'award',
      iconName: 'award',
      color: '#00d4ff'
    },
    {
      type: 'certificate',
      title: 'IT Essentials',
      description: 'Cisco NetAcad',
      issuedOn: 'Feb 14, 2023',
      issuer: 'Cisco NetAcad',
      pdf: '/certificates/GarciaFranco_IT_Essentials_certificate_gfe0725-dlsud-edu-ph.pdf',
      iconType: 'certificate',
      iconName: 'monitor',
      color: '#00bceb'
    },
    {
      type: 'certificate',
      title: 'Programming Essentials in Python',
      description: 'Cisco NetAcad',
      issuedOn: 'Dec 13, 2023',
      issuer: 'Cisco NetAcad',
      pdf: '/certificates/GarciaFranco_Programming_Essentials_in_Python_certificate_gfe0725-dlsud-edu-ph.pdf',
      iconType: 'certificate',
      iconName: 'code',
      color: '#00bceb'
    }
  ], [])

  const accomplishments = useMemo(() => [
    { text: 'Developed and debugged academic applications using C#, Java, PHP and Android Studio', category: 'Development' },
    { text: 'Designed database structures in MySQL and SQL Server for university projects', category: 'Database' },
    { text: 'Created interactive user interfaces with HTML, CSS, and JavaScript', category: 'Frontend' },
    { text: 'Applied object-oriented programming concepts in software projects', category: 'Programming' },
    { text: 'Built responsive and mobile-friendly web applications', category: 'Web Dev' },
    { text: 'Proficient in creating content for social media and digital marketing', category: 'Content' }
  ], [])

  const stats = useMemo(() => [
    { value: '20+', label: 'Technologies' },
    { value: '4', label: 'Certifications' },
    { value: '4+', label: 'Years Learning' }
  ], [])

  return (
    <section className="achievements-section" id="achievements">
      {/* Optimized CSS-only Background */}
      <div className="achievements-bg">
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-grid-pattern" />
        <div className="bg-particles-css" />
      </div>

      <div className="achievements-inner">
        {/* Header */}
        <motion.header 
          className="achievements-header"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-badge">
            <span className="badge-icon">
              <svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="20" cy="36" rx="10" ry="3" fill="#e0c36a" opacity="0.25"/>
                <rect x="15" y="28" width="10" height="5" rx="2.5" fill="#e0c36a"/>
                <rect x="17" y="24" width="6" height="6" rx="2" fill="#f7e07a"/>
                <path d="M10 10c0-5.523 4.477-10 10-10s10 4.477 10 10v5c0 5.523-4.477 10-10 10s-10-4.477-10-10v-5z" fill="url(#trophyCup)"/>
                <path d="M10 15c-3 0-5 2-5 5s2 5 5 5" stroke="#e0c36a" strokeWidth="2" fill="none"/>
                <path d="M30 15c3 0 5 2 5 5s-2 5-5 5" stroke="#e0c36a" strokeWidth="2" fill="none"/>
                <circle cx="20" cy="13" r="4" fill="#fff6c1"/>
                <defs>
                  <linearGradient id="trophyCup" x1="10" y1="0" x2="30" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#ffe066"/>
                    <stop offset="1" stop-color="#e0c36a"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="badge-pulse" />
          </div>
          
          <p className="header-eyebrow">Milestones & Expertise</p>
          
          <h2 className="header-title">
            <span className="title-line">Crafting Excellence</span>
            <span className="title-line gradient-text">Through Dedication</span>
          </h2>

          <div className="header-divider">
            <span className="divider-dot" />
          </div>

          <p className="header-subtitle">
            A passionate developer committed to continuous learning and innovation
          </p>
        </motion.header>

        {/* Objective Card */}
        <motion.div 
          className="objective-hero"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="objective-bg-pattern" />
          <div className="objective-glow" />
          <div className="objective-content">
            <div className="objective-icon-wrap">
              <span className="objective-icon icon-crosshair" />
            </div>
            <h3>Career Vision</h3>
            <p>
              Aspiring <span className="highlight">Junior Software Programmer</span> seeking to leverage 
              technical expertise in <span className="highlight">full-stack development</span>, 
              combining passion for clean code with innovative problem-solving to build 
              impactful digital solutions.
            </p>
            <div className="objective-tags">
              {['Software Development', 'Problem Solving', 'Innovation', 'Growth'].map((tag) => (
                <span key={tag} className="obj-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="objective-corner corner-tl" />
          <div className="objective-corner corner-tr" />
          <div className="objective-corner corner-bl" />
          <div className="objective-corner corner-br" />
        </motion.div>

        {/* Education Timeline */}
        <motion.div 
          className="education-block"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="block-header">
            <div className="block-icon-wrap">
              <span className="block-icon icon-book" />
            </div>
            <h3>Educational Journey</h3>
            <div className="header-line" />
          </div>
          
          <div className="timeline">
            <div className="timeline-line" />
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                className={`timeline-item ${edu.status}`}
                variants={slideInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                <div className="timeline-node">
                  <span className="node-dot" />
                  {edu.status === 'current' && <span className="node-pulse" />}
                </div>
                <div className="timeline-card">
                  <div className="card-header">
                    <span className="edu-years">{edu.years}</span>
                    {edu.status === 'current' && (
                      <span className="status-badge current">
                        <span className="status-dot" />
                        In Progress
                      </span>
                    )}
                    {edu.achievement && (
                      <span className="status-badge achievement">{edu.achievement}</span>
                    )}
                  </div>
                  <h4 className="edu-school">{edu.school}</h4>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-desc">{edu.description}</p>
                  {edu.highlights.length > 0 && (
                    <div className="edu-highlights">
                      {edu.highlights.map((h, i) => (
                        <span key={i} className="highlight-tag">{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div 
          className="certifications-block"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="block-header">
            <div className="block-icon-wrap">
              <span className="block-icon icon-medal" />
            </div>
            <h3>Certifications</h3>
            <div className="header-line" />
          </div>
          
          <div className="cert-grid">
            {certifications.map((cert, idx) => (
                <motion.div
                key={idx}
                className={`cert-card ${hoveredCert === idx ? 'active' : ''}`}
                variants={scaleIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                onMouseEnter={() => handleCertHover(idx)}
                onMouseLeave={handleCertLeave}
                style={{ '--cert-color': cert.color }}
                onClick={() => {
                  // clicking a card opens modal if there is a pdf associated
                  if (cert.pdf) {
                    setModalCert(cert)
                    setModalOpen(true)
                  }
                }}
              >
                <div className="cert-bg" />
                <div className="cert-glow" />
                <div className="cert-icon-wrap">
                  <span className={`cert-icon icon-${cert.iconType}`}>
                    <Icon name={cert.iconName} />
                  </span>
                  <span className="cert-icon-ring" />
                </div>
                <div className="cert-content">
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-desc">{cert.description}</p>
                  <div className="cert-meta">
                    {cert.issuedOn && <span className="cert-year">{cert.issuedOn}</span>}
                  </div>
                </div>
                <div className="cert-footer">
                  <button
                    type="button"
                    className="cert-action"
                    onClick={(e) => { e.stopPropagation(); handleView(cert) }}
                    aria-label={`View ${cert.title}`}
                  >
                    View
                  </button>
                </div>
                <div className="cert-shine" />
              </motion.div>
            ))}
          </div>
          {modalCert && (
            <Modal isOpen={modalOpen} onClose={handleCloseModal} title={modalCert.title}>
              {modalCert.pdf ? (
                <div className="gf-embed-wrap">
                  <iframe src={modalCert.pdf} title={modalCert.title} frameBorder="0" />
                </div>
              ) : (
                <div style={{ padding: '1rem' }}>
                  <p>No preview available.</p>
                </div>
              )}
            </Modal>
          )}
        </motion.div>

        {/* Key Accomplishments */}
        <motion.div 
          className="accomplishments-block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="block-header centered">
            <div className="block-icon-wrap">
              <span className="block-icon icon-star" />
            </div>
            <h3>Key Accomplishments</h3>
            <div className="header-line" />
          </div>
          
          <div className="accomplishments-grid">
            {accomplishments.map((item, idx) => (
              <div
                key={idx}
                className="accomplishment-card"
              >
                <div className="acc-border" />
                <span className="acc-number">{String(idx + 1).padStart(2, '0')}</span>
                <div className="acc-content">
                  <span className="acc-category">{item.category}</span>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Summary Card */}
        <motion.div 
          className="summary-hero"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="summary-bg-pattern" />
          <div className="summary-content">
            <div className="summary-icon icon-sparkle" />
            <h3>Experience Summary</h3>
            <p>
              A passionate <strong>Information Technology student</strong> at De La Salle University-Dasmarinas, 
              actively learning and building skills in <strong>web development</strong>, <strong>mobile applications</strong>, <strong>database systems</strong>, and <strong>digital content creation</strong>. 
              Eager to apply knowledge in real-world projects, write clean code, and continuously improve. 
              Ready to contribute, learn, and grow alongside a forward-thinking team.
            </p>
            <div className="summary-stats">
              {stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="summary-corner corner-tl" />
          <div className="summary-corner corner-tr" />
          <div className="summary-corner corner-bl" />
          <div className="summary-corner corner-br" />
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
