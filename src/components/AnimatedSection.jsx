import { motion } from 'framer-motion';

export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up', duration = 0.6 }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'fade' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={variants}
      transition={{
        duration: duration,
        delay: delay / 1000,
        ease: [0.215, 0.61, 0.355, 1], // Out-cubic curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
