import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import gamesData from '../data/games.json';  // Assuming the games.json is in src/data/

const Gallery = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setGames(gamesData);
    setFilteredGames(gamesData);  // Show all games initially
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
    setFilteredGames(
      games.filter((game) =>
        game.title.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <div className="gallery-container p-6"> {/* Add padding to the gallery container */}
      <input
        type="text"
        placeholder="Search games by title..."
        onChange={(e) => searchGames(e.target.value)}
        className="search-bar p-2 border mb-4"
      />

      <div className="gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGames.map((game) => (
          <div
          key={game.id}
          className="game-card bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => openModal(game)}
        >
          <img
            src={game.image}
            alt={game.title}
            className="game-image w-full h-40 object-cover rounded-t-lg"
          />
          <h3 className="game-title px-3 py-2 text-lg font-semibold text-gray-800 truncate">{game.title}</h3> {/* Adjusted padding */}
        </div>
        
        ))}
      </div>

      {showModal && <Modal game={selectedGame} close={closeModal} />}
    </div>
  );
};

export default Gallery;
