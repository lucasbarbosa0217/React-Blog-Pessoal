import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import Home from '../Home/Home';
import { ArrowDown, ArrowUp } from '@phosphor-icons/react';
import ListaTemas from '../Tema/listaTema/ListaTemas';
import FormularioTema from '../Tema/formularioTema/FormularioTema';
import DeletarTema from '../Tema/deletarTema/DeletarTema';
import FormularioPostagem from '../FormularioPostagem/FormularioPostagem';
import DeletarPostagem from '../DeletarPostagem/DeletarPostagem';
import ListaPostagens from '../../components/ListaPostagens/ListaPostagens';


interface NavLinkProps {
    to: string;
    children: React.ReactNode;
}

const AdminLink: React.FC<NavLinkProps> = ({ to, children }) => {
    const location = useLocation();
    const partes = location.pathname.split('/');

    const isActive = to === partes[partes.length - 1];

    return (
        <Link
            to={to}
            className={`p-2 ${isActive ? 'bg-dark-accent text-dark-textContent' : 'bg-light-background2 dark:bg-dark-background1 hover:bg-light-background1'}`}
        >
            {children}
        </Link>

    );
};


function Admin() {

    const [recolhido, setRecolhido] = useState(false)


    function handleRecolhido() {
        setRecolhido(!recolhido)
    }

    const divRef = useRef(null);

    useEffect(() => {
        if (recolhido && divRef.current) {
            divRef.current.style.height = '0px';
        } else if (divRef.current) {
            const scrollHeight = divRef.current.scrollHeight;
            divRef.current.style.height = `${scrollHeight}px`;
        }
    }, [recolhido]);

    const location = useLocation();
    return (
        <div className='flex flex-col flex-nowrap flex-grow  overflow-auto'>

            <aside className='flex flex-col flex-grow-0 bg-light-background2 dark:bg-dark-background2 md:min-w-[20rem] py-4'>
                <div className='flex justify-center gap-4' onClick={handleRecolhido}>
                        <h1 className='font-serif text-3xl text-center'>Painel de <span className='font-bold text-dark-accent'>Admin</span></h1>
                        <button onClick={handleRecolhido}>{recolhido ? <ArrowDown size={32} /> : <ArrowUp size={32} />}</button>
                    </div>


                <div className=''>
                    <ul className='flex flex-col'>

                        <div ref={divRef} className={`flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}>
                            <AdminLink to="postagens" >Gerenciar Postagens</AdminLink>
                            <AdminLink to="/editor/postagem">Escrever postagem</AdminLink>
                            <AdminLink to="temas" >Lista de temas</AdminLink>
                            <AdminLink to="cadastrarTema">Cadastrar tema</AdminLink>
                        </div>
                    </ul>
                </div>

            </aside>

            <div className='flex flex-grow flex-col justify-start p-4 '>
                <Routes>
                    <Route path="/" element={<AdminHome />} />
                    <Route path="temas" element={<ListaTemas />} />
                    <Route path="cadastrarTema" element={<FormularioTema />} />
                    <Route path="temas/editarTema/:id" element={<FormularioTema />} />
                    <Route path="temas/deletarTema/:id" element={<DeletarTema />} />
                    <Route path="deletarPostagem/:id" element={<DeletarPostagem />} />
                    <Route path="postagens" element={<ListaPostagens />} />
                    <Route path="home" element={<Home />} />

                </Routes>
            </div>
        </div>
    );
}


function AdminHome() {

    const { usuario } = useContext(AuthContext)
    return (
        <div className='flex flex-col items-center bg-light-background3  dark:bg-dark-background3 flex-grow justify-center'>
            <h1 className='font-serif text-3xl'>Bom dia administrador <span className='text-dark-accent'>{usuario.name}</span>!</h1>
            <p>Selecione uma opção do menu ao lado.</p>
        </div>
    )
}

export default Admin;