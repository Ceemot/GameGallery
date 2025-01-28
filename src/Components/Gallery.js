import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { getImagePath } from "../utils";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = ({ gamesData, hideSearchBar }) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [show100Percent, setShow100Percent] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
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

  const openModal = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedGame(null);
  };

  useEffect(() => {
    let filtered = games;
    // Filter by title
    if (searchTerm.trim()) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Filter by 100% completion
    if (show100Percent) {
      filtered = filtered.filter((game) => game.completed100);
    }
    setFilteredGames(filtered);
  }, [searchTerm, show100Percent, games]);

  return (
    <div className="p-8 text-center cursor-default">
      {/* Search Bar and Checkbox */}
      {!hideSearchBar && (
        <div className="flex items-center justify-center gap-4 mb-5">
          <input
            type="text"
            placeholder="Search games by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              px-4 py-2
              w-4/5 max-w-[400px] text-base
              border border-[#333] rounded-md
              bg-[#1e1e1e] text-white
              focus:outline-none
              focus:border-[#007bff]
              focus:shadow-[0_0_8px_rgba(0,123,255,0.5)]
            "
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
      )}

      {/* Game Cards */}
      <div className="grid grid-cols-[repeat(auto-fit,200px)] justify-center gap-5">
        <AnimatePresence>
          {filteredGames.map((game) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => openModal(game)}
              className="
              w-[200px] h-auto
              rounded-md overflow-hidden
              shadow-[0_4px_8px_rgba(0,0,0,0.2)]
              transition-transform transition-shadow
              duration-300 ease-in-out
              hover:scale-105
              hover:shadow-[0_6px_12px_rgba(0,0,0,0.4)]
              cursor-pointer
              bg-[#2c2c2c]
            "
            >
              <img
                src={getImagePath(game.image)}
                alt={game.title}
                className="w-full h-[300px] object-cover"
              />
              <div
                className="
                flex justify-between items-start
                bg-[#2c2c2c] text-[#f0f0f0]
                px-2 py-2 min-h-[60px]
              "
              >
                <p className="text-sm break-words">{game.title}</p>
                {game.completed100 && (
                  <span
                    className="
                    text-xs font-bold text-[#FFD700]
                    bg-[#2c2c2c] px-1 py-0.5
                    rounded-md
                    whitespace-nowrap
                  "
                  >
                    100%
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* AnimatePresence for the modal */}
        <AnimatePresence>
          {showModal && <Modal game={selectedGame} close={closeModal} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
