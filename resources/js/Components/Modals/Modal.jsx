import React from "react";
import { FaSpinner, FaTimes, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function Modal({ isOpen, type, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
      data-aos="fade-in"
      data-aos-duration="300"
    >
      <div
        className="bg-gray-900 rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        data-aos="zoom-in"
        data-aos-duration="300"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-transform duration-300 hover:scale-110"
        >
          <FaTimes className="text-xl" />
        </button>
        <div className="flex flex-col items-center gap-6 text-center">
          {type === "loading" && (
            <>
              <FaSpinner className="text-red-400 text-5xl animate-spin" />
              <p className="text-white text-lg font-medium">{message}</p>
            </>
          )}
          {type === "success" && (
            <>
              <div className="relative">
                <FaCheckCircle className="text-green-500 text-5xl animate-scale-in" />
              </div>
              <p className="text-white text-lg font-medium">{message}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-transform duration-300 hover:scale-105"
              >
                Close
              </button>
            </>
          )}
          {type === "error" && (
            <>
              <div className="relative">
                <FaExclamationCircle className="text-red-500 text-5xl animate-scale-in" />
              </div>
              <p className="text-white text-lg font-medium">{message}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-transform duration-300 hover:scale-105"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>

      {/* Inline CSS for scale-in animation */}
      <style>{`
        @keyframes scaleIn {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}