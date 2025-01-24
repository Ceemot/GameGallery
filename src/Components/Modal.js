import React, { useEffect } from 'react';

const Modal = ({ game, close }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close();  // Close the modal when Escape is pressed
      }
    };

    // Attach the event listener
    window.addEventListener('keydown', handleEscape);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [close]);
  return (
    <div className="modal" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{game.title}</h2>
        <img src={game.image} alt={game.title} className="modal-image" />
        <p><strong>Genre:</strong> {game.genre}</p>
        <p><strong>Date Completed:</strong> {game.dateCompleted || "Not Completed"}</p>
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default Modal;

