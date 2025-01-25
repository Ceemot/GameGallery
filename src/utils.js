// src/utils.js
export const getImagePath = (imageName) => {
    try {
      return require(`./images/${imageName}`);
    } catch (error) {
      console.error(`Error loading image: ${imageName}`, error);
      return ''; // Fallback to an empty string if image not found
    }
  };
  