import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { getImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";

const GameCard = ({ game, openModal }) => {
  return (
    <motion.div
      onClick={openModal}
      whileHover={{ scale: 1.1, zIndex: 10 }}
      transition={{ duration: 0.001 }}
      className="relative rounded-md shadow-md cursor-pointer bg-[#2c2c2c] transition-transform duration-300 ease-in-out"
    >
      <img
        src={getImagePath(game.image)}
        alt={game.title}
        className="w-full h-[300px] object-cover transition-transform duration-300"
      />
      {/* Bottom container */}
      <div className="flex justify-between items-stretch bg-[#2c2c2c] text-[#f0f0f0] px-2 py-2 min-h-[64px]">
        {/* Title container */}
        <p className="text-sm flex-1 pr-3 break-words" title={game.title}>
          {game.title}
        </p>
        {/* Right-side container */}
        <div className="flex flex-col justify-between items-end flex-shrink-0">
          <div className="w-full flex justify-center">
            {game.platformIcon && (
              <img
                src={getImagePath(game.platformIcon)}
                alt="Platform Icon"
                className="w-6 h-6"
              />
            )}
          </div>
          <div className="w-full flex justify-end">
            {game.completed100 && (
              <span className="text-xs font-bold text-[#FFD700] bg-[#2c2c2c] px-1 py-0.5 rounded-md whitespace-nowrap">
                100%
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = ({ gamesData, hideSearchBar, headerTitle }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show100Percent, setShow100Percent] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "scroll";
    setSearchTerm("");
    setGames(gamesData);
    setFilteredGames(gamesData);
    return () => {
      document.body.style.overflowY = "";
    };
  }, [gamesData]);

  // Update filteredGames when search term or show100Percent changes.
  useEffect(() => {
    let filtered = games;
    if (searchTerm.trim()) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (show100Percent) {
      filtered = filtered.filter((game) => game.completed100);
    }
    setFilteredGames(filtered);
  }, [searchTerm, show100Percent, games]);

  // When opening the modal, set both the selected game and its index.
  const openModal = (game, index) => {
    setSelectedIndex(index);
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGame(null);
  };

  // onNext and onPrev navigate through filteredGames.
  const handleNext = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % filteredGames.length;
      setSelectedGame(filteredGames[newIndex]);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex =
        prevIndex === 0 ? filteredGames.length - 1 : prevIndex - 1;
      setSelectedGame(filteredGames[newIndex]);
      return newIndex;
    });
  };

  return (
    <div className="p-8 text-center cursor-default">
      {/* Search Bar and Checkbox */}
      {!hideSearchBar ? (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <input
            type="text"
            placeholder="Search games by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full sm:w-4/5 max-w-[400px] text-base border border-[#333] rounded-md bg-[#1e1e1e] text-white focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_8px_rgba(0,123,255,0.5)]"
          />
          <label className="text-white flex items-center gap-2">
            <input
              type="checkbox"
              checked={show100Percent}
              onChange={(e) => setShow100Percent(e.target.checked)}
              className="cursor-pointer"
            />
            100%
          </label>
        </div>
      ) : (
        <h2 className="mb-5 text-2xl font-bold text-white">
          {headerTitle || "Default header"}
        </h2>
      )}

      {/* Game Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,200px)] justify-center gap-5">
        <AnimatePresence>
          {filteredGames.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              openModal={() => openModal(game, index)}
            />
          ))}
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {showModal && selectedGame && (
            <Modal
              game={selectedGame}
              close={closeModal}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
