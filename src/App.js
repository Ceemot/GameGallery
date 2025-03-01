// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Gallery from "./Components/Gallery";

// Example JSON data
import goty2023 from "./data/goty2023.json";
import full2023 from "./data/full2023.json";
import goty2024 from "./data/goty2024.json";
import full2024 from "./data/full2024.json";
import goty2025 from "./data/goty2025.json";
import full2025 from "./data/full2025.json";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/GameGallery" element={<MainLayout />}>
          <Route index element={<Gallery gamesData={full2025} />}></Route>
          <Route path="2025/full" element={<Gallery gamesData={full2025} />} />
          <Route path="2025/goty" element={<Gallery gamesData={goty2025} />} />
          <Route path="2024/full" element={<Gallery gamesData={full2024} />} />
          <Route path="2024/goty" element={<Gallery gamesData={goty2024} />} />
          <Route path="2023/full" element={<Gallery gamesData={full2023} />} />
          <Route path="2023/goty" element={<Gallery gamesData={goty2023} />} />
        </Route>
        <Route
          path="/"
          element={
            <div className="text-white text-center mt-8">
              This is home. Go to <a href="/GameGallery">/GameGallery</a>.
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
