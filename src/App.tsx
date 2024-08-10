import "./App.css";
import  { useContext, } from 'react';
import './App.css';
import { BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import Home from "./pages/Home/Home";
import ListaTemas from "./components/Tema/listaTema/ListaTemas";
import FormularioTema from "./components/Tema/formularioTema/FormularioTema.tsx";
import DeletarTema from "./components/Tema/deletarTema/DeletarTema.tsx";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Theme from "./components/Theme/Theme.tsx";
import Admin from "./pages/Admin/Admin.tsx";





function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>


    );
}


function AppContent() {

  const {usuario} = useContext(AuthContext);
  
  interface ProtectedRouteProps {
    element: JSX.Element;
  }

  function ProtectedRoute({ element }: ProtectedRouteProps): JSX.Element {

    console.log(usuario)

    const isAdmin = usuario && usuario.role && usuario.role.some(papel => papel.name === "ROLE_ADMIN");

    if (isAdmin === false) {
      alert("Usuário não é admin.");
    }

    return isAdmin ? element : <Navigate to="/home" />;
  }

  return (
    <>
        <BrowserRouter>
          <Header />
          <div className='flex flex-grow flex-col flex-nowrap'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/admin/*"
                element={<ProtectedRoute element={<Admin />} />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      <Theme/>
    </>
  );
}



export default App;