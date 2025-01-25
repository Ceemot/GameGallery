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
          max-w-[500px] w-[90%]
          text-left
          shadow-[0_8px_16px_rgba(0,0,0,0.5)]
        "
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2">{game.title}</h2>
        <img
          src={getImagePath(game.image)}
          alt={game.title}
          className="w-full h-[200px] object-cover rounded-md mb-3"
        />
        <p>
          <strong>Genre:</strong> {game.genre}
        </p>
        <p>
          <strong>Date Completed:</strong>{" "}
          {game.dateCompleted || "Not Completed"}
        </p>
        <p className="mt-2">{game.description}</p>
      </div>
    </div>
  );
};

export default Modal;
