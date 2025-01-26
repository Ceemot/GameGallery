// src/components/Modal.js

import React, { useEffect } from "react";
import { getImagePath } from "../utils";

const Modal = ({ game, close }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  return (
    <div
      className="
        fixed top-0 left-0
        w-full h-full
        bg-black/70
        flex justify-center items-center
        z-[9999]
      "
      onClick={close}
    >
      <div
        className="
          bg-[#1f1f1f] text-white
          rounded-md p-5
          w-[40%] max-w-[800px]
          text-left
          shadow-[0_8px_16px_rgba(0,0,0,0.5)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{game.title}</h2>
        <img
          src={getImagePath(game.image)}
          alt={game.title}
          className="w-full h-[400px] object-contain rounded-md mb-4"
        />
        <p className="mb-2">
          <strong>Genre:</strong> {game.genre}
        </p>
        <p className="mb-2">
          <strong>Date Completed:</strong>{" "}
          {game.dateCompleted || "Not Completed"}
        </p>
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default Modal;
