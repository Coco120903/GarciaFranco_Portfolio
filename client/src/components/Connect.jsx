import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactDOM from 'react-dom'
import emailjs from '@emailjs/browser'
import './Connect.css'

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, label, href }) => {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="confirm-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
      >
        <motion.div
          className="confirm-modal"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="confirm-modal-content">
            <h3 className="confirm-modal-title" id="confirm-modal-title">Open {label}?</h3>
            <p className="confirm-modal-text">
              {href.startsWith('mailto:') ? (
                <>You are about to open your email client to send a message to <strong>{label}</strong>.</>
              ) : href.startsWith('tel:') ? (
                <>You are about to open your phone dialer to call <strong>{label}</strong>.</>
              ) : (
                <>You are about to visit <strong>{label}</strong>. This will open in a new tab.</>
              )}
            </p>
            <div className="confirm-modal-actions">
              <button className="confirm-btn confirm-btn-cancel" onClick={onCancel}>
                Cancel
              </button>
              <button className="confirm-btn confirm-btn-confirm" onClick={onConfirm}>
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )
}

const ContactCard = ({ href, label, detail, children, onConfirmClick }) => {
  const handleClick = (e) => {
    // Show confirmation modal for all links
    e.preventDefault()
    onConfirmClick(href, label)
  }

  return (
    <a 
      href={href} 
      className="contact-card" 
      onClick={handleClick}
      rel="noopener noreferrer" 
      aria-label={label}
    >
      <div className="contact-icon" aria-hidden>
        {children}
      </div>
      <div className="contact-body">
        <div className="contact-label">{label}</div>
        <div className="contact-detail">{detail}</div>
      </div>
    </a>
  )
}

const Connect = () => {
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, href: '', label: '' })

  const handleConfirmClick = (href, label) => {
    setConfirmModal({ isOpen: true, href, label })
  }

  const handleConfirm = () => {
    // For mailto and tel links, open directly
    if (confirmModal.href.startsWith('mailto:') || confirmModal.href.startsWith('tel:')) {
      window.location.href = confirmModal.href
    } else {
      // For external links, open in new tab
      window.open(confirmModal.href, '_blank', 'noopener,noreferrer')
    }
    setConfirmModal({ isOpen: false, href: '', label: '' })
  }

  const handleCancel = () => {
    setConfirmModal({ isOpen: false, href: '', label: '' })
  }

  return (
    <section className="connect-section" id="connect">
      <div className="connect-inner">
        <motion.header 
          className="connect-header" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p 
            className="connect-eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            Get In Touch
          </motion.p>
          <motion.h2 
            className="connect-title"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            Let's Work Together
          </motion.h2>
          <motion.p 
            className="connect-sub"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Have a project in mind or want to collaborate? I'm open to discussing opportunities, ideas, and new challenges. Reach out through any channel below.
          </motion.p>
        </motion.header>

        <motion.div 
          className="connect-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          <motion.div 
            className="connect-socials" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          >
            <div className="connect-grid">
              <div className="connect-grid-item">
                <ContactCard href="mailto:franco__garcia@hotmail.com" label="Email" detail="franco__garcia@hotmail.com" onConfirmClick={handleConfirmClick}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </ContactCard>
              </div>

              <div className="connect-grid-item">
                <ContactCard href="tel:+639209429146" label="Phone" detail="09209429146" onConfirmClick={handleConfirmClick}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012 4.18 2 2 0 014 2h3a2 2 0 012 1.72c.12.9.34 1.78.65 2.6a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.48-1.1a2 2 0 012.11-.45c.82.31 1.7.53 2.6.65A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </ContactCard>
              </div>

              <div className="connect-grid-item">
                <ContactCard href="https://www.linkedin.com/in/franco-angelov-e-garcia-2530933a4/" label="LinkedIn" detail="franco-angelov-e-garcia" onConfirmClick={handleConfirmClick}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 8a6 6 0 016 6v6h-4v-6a2 2 0 00-4 0v6h-4v-12h4v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 9h4v12H2z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </ContactCard>
              </div>

              <div className="connect-grid-item">
                <ContactCard href="https://github.com/Coco120903" label="GitHub" detail="Coco120903" onConfirmClick={handleConfirmClick}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </ContactCard>
              </div>

              <div className="connect-grid-item">
                <ContactCard href="https://www.facebook.com/franco.garcia.958618/" label="Facebook" detail="franco.garcia.958618" onConfirmClick={handleConfirmClick}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </ContactCard>
              </div>

              <div className="connect-grid-item">
                <ContactCard href="https://www.instagram.com/coco__grc/" label="Instagram" detail="@coco__grc" onConfirmClick={handleConfirmClick}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M16.5 7.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </ContactCard>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="connect-form-section" 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          >
            <div className="connect-form-header">
              <h3 className="connect-form-title">Send a Message</h3>
              <p className="connect-form-sub">Fill out the form below and I'll get back to you soon</p>
            </div>
            <MessageForm />
          </motion.div>
        </motion.div>
      </div>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        label={confirmModal.label}
        href={confirmModal.href}
      />
    </section>
  )
}

export default Connect

/* MessageForm: scoped into Connect. Validates client-side, shows inline feedback, and isolates submit logic. */
function MessageForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })
  const nameRef = useRef(null)

  // Initialize EmailJS on component mount
  useEffect(() => {
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (PUBLIC_KEY && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(PUBLIC_KEY)
    }
  }, [])

  const sanitize = (s) => {
    return String(s).trim().replace(/[&<>\"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] || c))
  }

  const validateEmail = (e) => /^\S+@\S+\.\S+$/.test(e)

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setStatus({ type: '', text: '' })

    const n = sanitize(name)
    const em = sanitize(email)
    const msg = sanitize(message)

    if (!n || !em || !msg) {
      setStatus({ type: 'error', text: 'Please complete all required fields.' })
      return
    }
    if (!validateEmail(em)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' })
      return
    }

    setLoading(true)
    setStatus({ type: '', text: '' })

    // EmailJS configuration
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Debug: Log environment variables (remove in production)
    console.log('EmailJS Config:', {
      SERVICE_ID: SERVICE_ID ? 'Set' : 'Missing',
      TEMPLATE_ID: TEMPLATE_ID ? 'Set' : 'Missing',
      PUBLIC_KEY: PUBLIC_KEY ? 'Set' : 'Missing'
    })

    // Check if EmailJS is configured
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY || 
        SERVICE_ID === 'YOUR_SERVICE_ID' || 
        TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      setLoading(false)
      setStatus({ type: 'error', text: 'EmailJS not configured. Please check your .env file and restart the server. See EMAILJS_SETUP.md for instructions.' })
      return
    }

    try {
      // Initialize EmailJS if not already initialized
      emailjs.init(PUBLIC_KEY)

      // Send email using EmailJS
      // Note: to_email should be set in your EmailJS template, not here
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: n,
          from_email: em,
          message: msg,
          reply_to: em,
        }
      )

      console.log('Email sent successfully:', result)
      setStatus({ type: 'success', text: 'Message sent.\nThank you! I\'ll get back to you soon.' })
      setName('')
      setEmail('')
      setMessage('')
      nameRef.current?.focus()
    } catch (err) {
      console.error('Email sending failed - Full error:', err)
      console.error('Error details:', {
        text: err.text,
        status: err.status,
        service: SERVICE_ID,
        template: TEMPLATE_ID
      })
      
      // Show specific error message
      let errorMessage = 'Failed to send message. '
      if (err.text) {
        errorMessage += err.text
      } else if (err.status) {
        errorMessage += `Error code: ${err.status}`
      } else {
        errorMessage += 'Please check your EmailJS configuration and try again.'
      }
      
      setStatus({ 
        type: 'error', 
        text: errorMessage
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="connect-form" onSubmit={handleSubmit} aria-live="polite">
      <div className="connect-form-grid">
        <label className="connect-field">
          <span className="connect-label">Name</span>
          <input ref={nameRef} className="connect-input" type="text" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} required />
        </label>

        <label className="connect-field">
          <span className="connect-label">Email</span>
          <input className="connect-input" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </label>

         <label className="connect-field connect-field-full">
           <span className="connect-label">Message</span>
           <textarea className="connect-textarea" rows={4} placeholder="Short message" value={message} onChange={(e)=>setMessage(e.target.value)} required />
         </label>
      </div>

      <div className="connect-form-actions">
        <button type="submit" className="connect-button" disabled={loading}>
          {loading ? 'Sending…' : 'Send Message'}
        </button>
        <div className={`connect-feedback ${status.type || ''}`} role="status" aria-live="polite">{status.text}</div>
      </div>
    </form>
  )
}
