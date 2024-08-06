import "./App.css";
import Theme from "./components/Theme/Theme.tsx";

import Header from "./components/Header/Header.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Categorias from "./pages/Categorias/Categorias.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="flex-grow">
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />

      </Routes>
      </div>
      <Theme />
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
