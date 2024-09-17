import "./App.css";
import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import 'react-toastify/dist/ReactToastify.css';

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Admin from "./pages/Admin/Admin.tsx";
import Post from "./pages/Post/Post.tsx";
import Perfil from "./pages/Perfil/Perfil.tsx";
import { toastAlerta } from "./utils/toasAlerts.ts";
import { ToastContainer } from "react-toastify";
import FormularioPostagem from "./pages/FormularioPostagem/FormularioPostagem";
import ListaPesquisa from "./components/ListaPostagens/ListaPesquisa.tsx";

function App() {
  return (
    <AuthProvider>
      {/* Envolvendo o AppContent com BrowserRouter */}
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const location = useLocation();

  interface ProtectedRouteProps {
    element: JSX.Element;
  }

  function ProtectedRoute({ element }: ProtectedRouteProps): JSX.Element {
    const isAdmin = usuario && usuario.role && usuario.role.some(papel => papel.name === "ROLE_ADMIN");

    if (!isAdmin) {
      toastAlerta('Usuário não é admin', 'info');
    }

    return isAdmin ? element : <Navigate to="/home" />;
  }

  // Lista de rotas onde o Header e Footer não devem ser exibidos
  const hideHeaderAndFooterRoutes = ['/editor/postagem'];

  function checkRenderFooterAndHeader(){
    let path = location.pathname

    let isPath = hideHeaderAndFooterRoutes.some((string) => path.includes(string))

    return isPath
  }

  return (
    <>
      <ToastContainer />
      {/* Condicional para exibir ou ocultar Header */}
      {!checkRenderFooterAndHeader() && <Header />}
      <div className='flex flex-grow flex-col flex-nowrap'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:urlpath" element={<Post />} />
          <Route path="/pesquisa/:pesquisa" element={<ListaPesquisa />} />

          <Route path="/perfil" element={<Perfil />} />
          <Route path="/admin/*" element={<ProtectedRoute element={<Admin />} />} />
          <Route path="/editor/postagem" element={<ProtectedRoute element={<FormularioPostagem />} />} />
          <Route path="/editor/postagem/:id" element={<ProtectedRoute element={<FormularioPostagem />} />} />


        
        </Routes>
      </div>
      {/* Condicional para exibir ou ocultar Footer */}
      {!checkRenderFooterAndHeader() && <Footer />}
    </>
  );
}

export default App;
