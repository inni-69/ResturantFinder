import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import RestaurantList from "./components/RestaurantList";
import RestaurantDetail from "./components/RestaurantDetail";
import RestaurantsNear from "./components/RestaurantsNear";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/restaurants/near" element={<RestaurantsNear />} />
      </Routes>
    </Router>
  );
}

export default App;
