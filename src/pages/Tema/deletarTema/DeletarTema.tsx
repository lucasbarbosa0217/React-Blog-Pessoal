import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../contexts/AuthContext';
import Theme from '../../../models/Theme';
import { buscar, deletar } from '../../../services/Service';
import { Link } from 'react-router-dom';
import { Eraser, PencilSimpleLine } from '@phosphor-icons/react';
import { RotatingLines } from 'react-loader-spinner';
import { toastAlerta } from '../../../utils/toasAlerts';

function DeletarTema() {
    const [tema, setTema] = useState<Theme>({} as Theme);

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;


    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPost, setIsLoadingPost] = useState(true)


    async function buscarPorId(id: string) {
        try {
            setIsLoadingPost(true);
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    'Authorization': token
                }
            });
            setIsLoadingPost(false);

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', "error");
                handleLogout();
            }
            setIsLoadingPost(false);

        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', "error");
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function retornar() {
        navigate("/admin/temas");
    }

    async function deletarTema() {
        try {
            setIsLoading(true)
            await deletar(`/temas/${id}`, {
                headers: {
                    'Authorization': token
                }
            });
            setIsLoading(false)
            toastAlerta('Tema apagado com sucesso', "sucess");

        } catch (error) {
            toastAlerta('Erro ao apagar o Tema', "error");
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', "error");
                handleLogout();
            }
            setIsLoading(false)

        }

        retornar();
    }

    return (
        <div className='rounded-xl bg-light-background3 m-4 dark:bg-dark-background3 flex flex-col p-4 max-w-[30rem] w-full self-center justify-center gap-2'>
            <h1 className='text-4xl font-serif text-center my-4'>Deletar tema</h1>
            <p className='text-center  mb-4'>Você tem certeza de que deseja apagar o tema a seguir? Todas as postagens relacionadas a esse tema serão <span className='font-black text-red-500'>apagadas para sempre.</span></p>

            <div className='flex  rounded-xl flex-col overflow-hidden justify-between shadow-md border dark:border-dark-background2  bg-light-background3 dark:bg-dark-background3'>
                <header className='p-2 bg-light-accent text-dark-textContent '>
                    Tema
                </header>
                <p className='p-4 text-2xl text-center'>{tema.description}</p>
                <div className="flex border-t-2 dark:border-dark-background2">
                    <button
                        className='w-full  text-blue-500   py-2  border-r-2 dark:border-dark-background2  hover:bg-blue-500 hover:text-stone-50'
                        onClick={retornar}
                    >
                        Não
                    </button>
                

                    <button
                        disabled={isLoading || isLoadingPost}
                        className={`w-full text-red-500 flex items-center justify-center font-black hover:bg-red-500 hover:text-stone-50 ${(isLoading || isLoadingPost) && "bg-slate-400 hover:bg-slate-400"}`}
                        onClick={deletarTema}
                    >
                        {
                            (isLoading || isLoadingPost) ?
                                <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> :
                                "Sim"
                        }
                    </button>
                </div>


            </div>
        </div>
    );
}

export default DeletarTema;