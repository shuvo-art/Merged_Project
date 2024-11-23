import React from "react";
import { motion, AnimatePresence } from "framer-motion";
const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  // Framer Motion animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Starting state: faded out and smaller
    visible: { opacity: 1, scale: 1 }, // Ending state: fully visible and normal scale
    exit: { opacity: 0, scale: 0.8 }, // Exit state: faded out and smaller
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth animation
          className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
          <h2 className="text-lg font-bold text-red-600 text-center mb-2">
            Are you sure !!
          </h2>
          <p className="text-center text-yellow-600 font-medium mb-4">
            Do you want to delete this content?
          </p>
          <button
            onClick={onConfirm}
            className="bg-[#8CAB91] text-white px-4 py-2 rounded-lg w-full"
          >
            Delete
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
