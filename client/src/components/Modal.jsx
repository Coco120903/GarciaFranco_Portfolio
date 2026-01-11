import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import './achievements.css'

const Modal = ({ isOpen, onClose, title, children }) => {
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const previousActive = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    previousActive.current = document.activeElement
    
    // Check if mobile (only disable scroll on mobile)
    const isMobile = window.innerWidth <= 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    // lock background scroll (mobile only)
    const prevOverflow = document.body.style.overflow
    let scrollY = 0
    if (isMobile) {
      scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      // Prevent scroll position jump by fixing position at current scroll
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
    }

    // focus the content container
    const focusEl = contentRef.current
    if (focusEl) focusEl.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        // basic focus trap
        const focusable = contentRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!focusable.length) {
          e.preventDefault()
          return
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (isMobile) {
        document.body.style.overflow = prevOverflow
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        // Restore scroll position
        window.scrollTo(0, scrollY)
      } else {
        document.body.style.overflow = prevOverflow
      }
      // restore focus
      if (previousActive.current && previousActive.current.focus) previousActive.current.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="gf-modal-overlay" ref={overlayRef} role="dialog" aria-modal="true" aria-label={title} onMouseDown={(e) => { if (e.target === overlayRef.current) onClose() }}>
      <div className="gf-modal" ref={contentRef} tabIndex={-1}>
        <div className="gf-modal-header">
          <h3 className="gf-modal-title">{title}</h3>
          <button className="gf-modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>
        <div className="gf-modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
