import React, { useContext } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import FormularioTema from '../../components/Tema/formularioTema/FormularioTema'
import DeletarTema from '../../components/Tema/deletarTema/DeletarTema'
import ListaTemas from '../../components/Tema/listaTema/ListaTemas';
import { AuthContext } from '../../contexts/AuthContext';


interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

const AdminLink: React.FC<NavLinkProps> = ({ to, children }) => {
    const location = useLocation();
    const partes = location.pathname.split('/');

    const isActive = to === partes[partes.length -1];

    return (
        <Link
            to={to}
            className={`p-2 ${isActive ? 'bg-dark-accent text-dark-textContent' : 'bg-light-background1 dark:bg-dark-background1'}`}
        >
            {children}
        </Link>

    );
};





function Admin() {

    const location = useLocation();
    return (
        <div className='flex flex-row flex-nowrap flex-grow'>

            <aside className='flex gap-4 flex-col min-h-full p-4 bg-light-background2 dark:bg-dark-background2'>
                <Link to="/admin">
                <h1 className='font-serif text-2xl text-center'>Painel de <span className='font-bold text-dark-accent'>Admin</span></h1>
                </Link>
                <div className='border-y border-dark-accent py-4'>
                    <ul className='flex flex-col gap-1'>
                        <AdminLink to="temas" >Lista de temas</AdminLink>  
                    <AdminLink to="cadastrarTema">Cadastrar tema</AdminLink>    
    
                    </ul>    
                </div>
            </aside>

            <div className='flex flex-grow justify-center p-4'>
                <Routes>
                    <Route path="/" element={<AdminHome/>} />

                    <Route path="temas" element={<ListaTemas />} />
                    <Route path="cadastrarTema" element={<FormularioTema />} />
                    <Route path="temas/editarTema/:id" element={<FormularioTema />} />
                    <Route path="temas/deletarTema/:id" element={<DeletarTema />} />
                </Routes>
            </div>
        </div>
    );
}


function AdminHome(){

    const {usuario} = useContext(AuthContext)
    return (
        <div className='flex flex-col items-center bg-light-background3 flex-grow justify-center'>
            <h1 className='font-serif text-3xl'>Bom dia administrador <span className='text-dark-accent'>{usuario.name}</span>!</h1>
        <p>Selecione uma opção do menu ao lado.</p>
        </div>
    )
}

export default Admin;