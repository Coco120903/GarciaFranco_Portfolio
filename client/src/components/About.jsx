import './about.css'
import Atom from './Atom'
import { useMemo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Modal from './Modal'

const About = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState(null) // 'cv' or 'resume'

  const handleOpenModal = useCallback((type) => {
    setModalType(type)
    setModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
    setModalType(null)
  }, [])

  const technicalSkills = useMemo(() => [
    { name: 'React', color: '#61dafb', note: 'Built small UIs for class projects' },
    { name: 'Node.js', color: '#339933', note: 'Created simple APIs' },
    { name: 'MongoDB', color: '#47a248', note: 'Used for coursework databases' },
    { name: 'Express', color: '#000000', note: 'Routing and middleware in small apps' },
    { name: 'JavaScript', color: '#f7df1e', note: 'Frontend logic and DOM work' },
    { name: 'Python', color: '#3776ab', note: 'Scripts, automation, and small tools' },
    { name: 'HTML5', color: '#e44d26', note: 'Semantic markup and accessibility' },
    { name: 'CSS3', color: '#1572b6', note: 'Layout and responsive styling' },
    { name: 'Java', color: '#f89820', note: 'Basic object-oriented projects' },
    { name: 'C#', color: '#68217a', note: 'Simple desktop apps and exercises' },
    { name: 'ASP.NET', color: '#512bd4', note: 'Intro web forms and routing' },
    { name: 'PHP', color: '#777bb4', note: 'Small server-side scripts' },
    { name: 'Dart', color: '#0175c2', note: 'Experimented with language features' },
    { name: 'Flutter', color: '#02569b', note: 'Built basic mobile UI demos' },
    { name: 'MySQL', color: '#00758f', note: 'Querying and schema design' },
    { name: 'SQL Server', color: '#cc2927', note: 'Database work in class projects' },
    { name: 'Kubernetes', color: '#326ce5', note: 'Learning container orchestration basics' },
    { name: 'GitHub', color: '#181717', note: 'Version control and PR workflow' },
    { name: 'Bootstrap', color: '#7952b3', note: 'Quick UI scaffolding' }
  ], [])

  const creativeTools = useMemo(() => [
    { name: 'Figma', color: '#f24e1e' },
    { name: 'Canva', color: '#00c4cc' },
    { name: 'Adobe Illustrator', color: '#ff9a00' },
    { name: 'Photoshop', color: '#31a8ff' },
    { name: 'CapCut', color: '#000000' },
    { name: 'Premiere Pro', color: '#9999ff' },
    { name: 'AI Tools', color: '#10a37f' }
  ], [])

  const softSkills = useMemo(() => [
    { name: 'Problem Solving', iconType: 'puzzle', description: 'Analytical thinking and creative solutions' },
    { name: 'Team Collaboration', iconType: 'team', description: 'Effective communication and teamwork' },
    { name: 'Content Creation', iconType: 'camera', description: 'Photography, styling, and video production' },
    { name: 'Social Media', iconType: 'share', description: 'Strategy and engagement across platforms' },
    { name: 'Design & Editing', iconType: 'palette', description: 'Canva, CapCut, and Photoshop proficiency' },
    { name: 'Time Management', iconType: 'clock', description: 'Efficient project delivery' }
  ], [])

  return (
    <section className="section-two" id="about">
      <div className="about-inner">
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p 
            className="about-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            About Me
          </motion.p>
          <motion.p 
            className="about-body"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            A 22 year old IT student studying at De La Salle University - Dasmariñas with an interest in web development and learning how modern applications are built. Enjoys working on projects, exploring new technologies, and gradually improving through hands-on experience. Focuses on building simple, functional, and clean interfaces while paying attention to usability and structure.
          </motion.p>

          <motion.div 
            className="about-buttons"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <button className="about-btn about-btn-cv" onClick={() => handleOpenModal('cv')}>
              View CV
            </button>
            <button className="about-btn about-btn-resume" onClick={() => handleOpenModal('resume')}>
              View Resume
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          className="about-divider" 
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />

        {/* Skills Section */}
        <motion.div 
          className="skills-section-about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        >

          {/* Atom (Tech List + Atom) */}
          <div className="atom-full-row">
            <Atom />
          </div>

          {/* Creative Tools */}
          <motion.div 
            className="creative-tools-block-about"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            <div className="block-header-about">
              <h3>Design & Creative</h3>
            </div>
            
            <div className="tech-tags-grid-about">
              {creativeTools.map((tool, idx) => (
                <div
                  key={idx}
                  className="tech-tag-about creative-tag-about"
                  style={{ '--tag-color': tool.color }}
                >
                  <span className="tag-dot-about" />
                  <span className="tag-name-about">{tool.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div 
            className="soft-skills-block-about"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            <div className="block-header-about">
              <h3>Core Competencies</h3>
            </div>
            
            <div className="soft-grid-about">
              {softSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="soft-card-about"
                >
                  <div className="soft-card-bg-about" />
                  <div className="soft-card-border-about" />
                  <div className="soft-icon-wrap-about">
                    <span className="soft-icon-about" data-icon={skill.iconType} />
                  </div>
                  <h4>{skill.name}</h4>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
          </div>
      {modalType && (
        <Modal 
          isOpen={modalOpen} 
          onClose={handleCloseModal} 
          title={modalType === 'cv' ? 'Curriculum Vitae' : 'Resume'}
        >
          {modalType === 'cv' ? (
            <div className="gf-embed-wrap">
              <iframe src="/FrancoGarcia_CV.pdf" title="Curriculum Vitae" frameBorder="0" />
                </div>
          ) : (
            <div className="gf-embed-wrap">
              <iframe src="/FrancoGarcia_Resume.pdf" title="Resume" frameBorder="0" />
            </div>
          )}
        </Modal>
      )}
    </section>
  )
}

export default About
