import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  // Framer Motion animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 }, // Starting state: faded out and smaller
    visible: { opacity: 1, scale: 1 }, // Fully visible and normal scale
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }, // Exit: fade and shrink
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth animation
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
