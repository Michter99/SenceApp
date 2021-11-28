import React from "react";
import Navbar from "../Navbar/Navbar";
import Perfil from "../Perfil/Perfil";
import Tutores from "../Tutores/Tutores";
import Footer from "../Footer/Footer";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function Home({ correoUsuario }) {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Perfil />} />
        <Route
          path="/Tutores"
          element={<Tutores correoUsuario={correoUsuario} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default Home;
