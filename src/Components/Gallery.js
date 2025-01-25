// src/Components/Gallery.js
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { getImagePath } from "../utils";

const Gallery = ({ gamesData }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  // 1. Track the searchTerm in local state:
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 2. Whenever `gamesData` changes (i.e., user navigates to a different route),
  //    reset the search bar and the game lists:
  useEffect(() => {
    setSearchTerm(""); // Clear the search bar
    setGames(gamesData); // Load the new data
    setFilteredGames(gamesData); // Filtered = entire dataset by default
  }, [gamesData]);

  const openModal = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGame(null);
  };

  // 3. Update filtered games whenever `searchTerm` changes:
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredGames(filtered);
    }
  }, [searchTerm, games]);

  return (
    <div className="p-8 text-center cursor-default">
      <input
        type="text"
        placeholder="Search games by title..."
        // 4. Controlled input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          block mx-auto mb-5 px-4 py-2
          w-4/5 max-w-[400px] text-base
          border border-[#333] rounded-md
          bg-[#1e1e1e] text-white
          focus:outline-none
          focus:border-[#007bff]
          focus:shadow-[0_0_8px_rgba(0,123,255,0.5)]
        "
      />

      <div className="grid grid-cols-[repeat(auto-fit,200px)] justify-center gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => openModal(game)}
            className="
              w-[200px] h-[300px]
              bg-[#1e1e1e] text-white
              rounded-md overflow-hidden
              shadow-[0_4px_8px_rgba(0,0,0,0.2)]
              transition-transform transition-shadow
              duration-300 ease-in-out
              hover:scale-105
              hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
              
              // 5. Remove or override pointer:
              cursor-default
            "
          >
            <img
              src={getImagePath(game.image)}
              alt={game.title}
              className="w-full h-[60%] object-cover"
            />
            <h3
              className="
                p-3 text-base font-bold text-center
                bg-[#2c2c2c] text-[#f0f0f0]
                h-[40%] flex items-center justify-center
              "
            >
              {game.title}
            </h3>
          </div>
        ))}
      </div>

      {showModal && <Modal game={selectedGame} close={closeModal} />}
    </div>
  );
};

export default Gallery;
