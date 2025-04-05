// src/components/Modal.js
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { getImagePath } from "../utils";

const Modal = ({ game, close, onPrev = () => {}, onNext = () => {} }) => {
  // Close modal on Escape key press.
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [close]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-[9999]"
      onClick={close}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#1f1f1f] text-white p-5 rounded-md shadow-lg w-[80%] max-w-[600px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Top-right close button for mobile */}
        <button
          onClick={close}
          className="absolute top-2 right-2 p-1 bg-gray-800 rounded hover:bg-gray-700 text-sm md:hidden"
        >
          X
        </button>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl p-2 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          &#8592;
        </button>
        <button
          onClick={onNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-2xl p-2 bg-gray-800 rounded-full hover:bg-gray-700"
        >
          &#8594;
        </button>

        {/* Modal Content */}
        <h2 className="text-2xl font-bold mb-4">{game.title}</h2>
        <img
          src={getImagePath(game.image)}
          alt={game.title}
          className="w-full object-contain rounded-md mb-4"
        />
        <p className="mb-2">
          <strong>Date Completed:</strong>{" "}
          {game.dateCompleted || "Not Completed"}
        </p>
        <p className="mb-2">
          <strong>Platform:</strong> {game.platform || "Unknown"}
        </p>
        <p>
          <strong>Completed 100%:</strong> {game.completed100 ? "Yes" : "No"}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
