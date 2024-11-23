import React from "react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3 relative">
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
      </div>
    </div>
  );
};

export default ConfirmationModal;
