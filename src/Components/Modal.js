import React, { useEffect } from 'react';
import { getImagePath } from '../utils';

const Modal = ({ game, close }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close(); // Close modal on Escape key press
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [close]);

  return (
    <div className="modal" onClick={close}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to close modal
      >
        <h2>{game.title}</h2>
        <img
  src={getImagePath(game.image)} // Use utility function
  alt={game.title}
  className="modal-image"
/>
        <p>
          <strong>Genre:</strong> {game.genre}
        </p>
        <p>
          <strong>Date Completed:</strong>{' '}
          {game.dateCompleted || 'Not Completed'}
        </p>
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default Modal;
