import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
    </motion.footer>
  )
}

export default Footer