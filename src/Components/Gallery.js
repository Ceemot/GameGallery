import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import gamesData from '../data/games.json';
import { getImagePath } from '../utils';

const Gallery = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setGames(gamesData);
    setFilteredGames(gamesData);
  }, []);

  const openModal = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGame(null);
  };

  const searchGames = (term) => {
    if (!term.trim()) {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) =>
        game.title.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  };

  return (
    <div className="gallery-container">
      <input
        type="text"
        placeholder="Search games by title..."
        onChange={(e) => searchGames(e.target.value)}
        className="search-bar"
      />
      <div className="gallery">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="game-card"
            onClick={() => openModal(game)}
          >
            <img
  src={getImagePath(game.image)} // Use utility function
  alt={game.title}
  className="game-image"
/>
            <h3 className="game-title">{game.title}</h3>
          </div>
        ))}
      </div>

      {showModal && <Modal game={selectedGame} close={closeModal} />}
    </div>
  );
};

export default Gallery;
