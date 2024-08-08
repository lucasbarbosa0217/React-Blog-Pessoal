import "./App.css";
import Theme from "./components/Theme/Theme.tsx";

import Header from "./components/Header/Header.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import Categorias from "./pages/Categorias/Categorias.tsx";
import Footer from "./components/Footer/Footer.tsx";
import { useState } from "react";
import AxiosTest from "./pages/AxiosTest/AxiosTest.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Cadastro from "./pages/Cadastro/Cadastro.tsx";

function App() {

  const [isLogged, setIsLogged] = useState(false)
  return (
    <AuthProvider>
    <BrowserRouter>
      <Header />
      <div className="flex flex-grow flex-col flex-nowrap">
      <Routes >
          <Route path="/home" element={ <Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/categorias" element={<Categorias />} />
          <Route path="/axios" element={<AxiosTest />} />
      </Routes>
      </div>
      <Theme />
      <Footer></Footer>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
