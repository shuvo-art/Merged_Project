import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ title, children, isOpen, onClose }) => {
  // Framer Motion animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Starting state: faded out and smaller
    visible: { opacity: 1, scale: 1 }, // Ending state: fully visible and normal scale
    exit: { opacity: 0, scale: 0.8 }, // Exit state: faded out and smaller
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background overlay with fade-in/out */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose} // Close modal on background click
          ></motion.div>

          {/* Modal content with scale and fade animation */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
            {/* Modal Title */}
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            {/* Modal Children */}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
