import "./App.css";
import Theme from "./components/Theme/Theme.tsx";
import Flex from "./components/Flex/Flex.tsx";
import Grid from "./components/Grid/Grid.tsx";
import Header from "./components/Header/Header.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Categorias from "./pages/Categorias/Categorias.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />

      </Routes>
      <Theme />
    </BrowserRouter>
  );
}

export default App;
