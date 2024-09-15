import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Theme from '../../models/Theme';
import { Blog } from '../../models/Blog';
import { atualizar, buscar, cadastrar } from '../../services/Service';
import { toastAlerta } from '../../utils/toasAlerts';
import styles from "./post.module.css"
import Editor from './Editor';
import FormularioTema from '../Tema/formularioTema/FormularioTema';
import { X } from '@phosphor-icons/react';
import { RotatingLines } from 'react-loader-spinner';
import ThemeComponent from "../../components/Theme/Theme"

function FormularioPostagem() {
    let navigate = useNavigate();


    const [isLoadingSend, setIsLoadingSend] = useState(false)
    const [isLoadingPost, setIsLoadingPost] = useState(false)


    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [temas, setTemas] = useState<Theme[]>([]);

    const [tema, setTema] = useState<Theme>({
        id: "",
        description: '',
        blog: null
    });

    const [value, setValue] = useState('');


    const [postagem, setPostagem] = useState<Blog>({} as Blog);


    const [isLoading, setIsLoading] = useState("");


    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    async function buscarPostagemPorId(id: string) {
        try {
            setIsLoadingPost(true)
            let text = await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    Authorization: token,
                },
            });
            setIsLoading(text)
            setIsLoadingPost(false)


        } catch (e) {
            if (e.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
                setIsLoadingPost(false)

            }
        }
    }


    function handleTema(id: string) {
        console.log(id)
        setPostagem({ ...postagem, theme: { id: id } })
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: {
                    Authorization: token,
                },
            });

        } catch (e) {
            if (e.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
        if (id !== undefined) {
            buscarPostagemPorId(id);

        }
    }, [id]);



    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            user: { id: usuario.id }
        });
    }

    function retornar() {
        navigate('/admin/postagens');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();


        if (id != undefined) {
            try {
                setIsLoadingSend(true);
                console.log(postagem)
                await atualizar(`/postagens`, { ...postagem, text: value }, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                toastAlerta('Postagem atualizada com sucesso!', 'sucess')
                setIsLoadingSend(false);


                // retornar();
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'error')
                    handleLogout()
                } else {

                    toastAlerta('Erro ao atualizar postagem', 'error')

                }

                setIsLoadingSend(false);

            }
        } else {
            try {
                setIsLoadingSend(true);




                await cadastrar(`/postagens`, { ...postagem, text: value }, setPostagem, {

                    headers: {
                        Authorization: token,
                    },
                });

                toastAlerta('Postagem cadastrada com sucesso', 'sucess')
                setIsLoadingSend(false);



                retornar();
            } catch (error: any) {
                if (error.toString().includes('403')) {

                    toastAlerta('O token expirou, favor logar novamente', 'info')

                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar a Postagem', 'error')
                }

                setIsLoadingSend(false);

            }
        }
    }


    function handleContentChange(content) {
        setValue(content)
    }




    return (
        <div className="w-screen right-0 flex   flex-row flex-nowrap mx-auto items-center dark:bg-dark-background3  h-full gap-4 ">
            <Link to="/admin" className='fixed top-0 right-0 pt-4 pr-5'>            <X size={42}></X></Link>

            <div className='grid sm:grid-cols-1 lg:grid-cols-2 h-fit w-full container mx-auto overflow-auto' >

                <div className="max-h-full">


                    {

                        (isLoading || !id) &&
                        <Editor onContentChange={handleContentChange} initialContent={isLoading} />

                    }
                </div>

                <div className='bg-light-background3 dark:bg-dark-background2 h-screen rounded-r-xl border-l dark:border-l-dark-background3 p-8 flex flex-col justify-between'>
                    <div>
                        <h1 className="text-4xl text-center ">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

                        <form onSubmit={gerarNovaPostagem} className="flex flex-col  gap-4 ">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="titulo">Titulo da postagem</label>
                                <input
                                    value={postagem.title}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    type="text"
                                    placeholder="Titulo"
                                    name="title"
                                    required
                                    className=" rounded-lg p-3  bg-light-background2 dark:bg-dark-background1 outline-none "
                                />
                            </div>

                            <div className="flex flex-col gap-2 ">
                                <p>Tema da postagem</p>
                                <select name="tema" id="tema" className='p-3 bg-light-background2 dark:bg-dark-background1 border-slate-800 rounded-lg' onChange={(e) => handleTema(e.currentTarget.value)}>
                                    <option value="" selected disabled>Selecione um tema</option>
                                    {temas.map((tema) => (
                                        <>
                                            <option value={tema.id} key={tema.id} >{tema.description} </option>
                                        </>
                                    ))}
                                </select>
                            </div>
                            <button disabled={isLoadingSend || isLoadingPost} type='submit' className={`mt-4  disabled:bg-slate-200 bg-light-accent hover:bg-light-accentSelected text-white font-bold w-full rounded-lg mx-auto  py-2 flex justify-center
                                ${(isLoadingSend || isLoadingPost) && "bg-slate-600 hover:bg-slate-600"}`}>
                                {(isLoadingSend || isLoadingPost) ? <RotatingLines
                                    strokeColor="white"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="24"
                                    visible={true}
                                /> : id !== undefined ? 'Editar' : 'Cadastrar'}


                            </button>

                        </form>
                    </div>


                    <div className='flex justify-end h-12'>
                        <ThemeComponent />
                    </div>


                </div>
            </div>

        </div>
    );
}

export default FormularioPostagem;