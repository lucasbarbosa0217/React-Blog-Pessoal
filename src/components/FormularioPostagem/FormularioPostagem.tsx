import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Theme from '../../models/Theme';
import { Blog } from '../../models/Blog';
import { atualizar, buscar, cadastrar } from '../../services/Service';
import { toastAlerta } from '../../utils/toasAlerts';
import styles from "./post.module.css"
import Editor from './Editor';


function FormularioPostagem() {
    let navigate = useNavigate();

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

    async function buscarPostagemPorId(id: string) {
        let text = await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        });
        setIsLoading(text)
    }

     function handleTema(id: string) {
         setPostagem({...postagem, theme: { id: id }})
    }

    async function buscarTemas() {
        await buscar('/temas', setTemas, {
            headers: {
                Authorization: token,
            },
        });
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

    useEffect(() => {
        setPostagem({
            ...postagem,
            theme: tema,
        });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            theme: tema,
            user: {id: usuario.id }
        });
    }

    function retornar() {
        navigate('/admin/postagens');
    }

    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(JSON.stringify({ postagem }));

        if (id != undefined) {
            try {
                console.log(value)
                await atualizar(`/postagens`, { ...postagem, text: value }, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });
                toastAlerta('Postagem atualizada com sucesso!', 'sucess')

                retornar();
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'error')
                    handleLogout()
                } else {
               
                    toastAlerta('Erro ao atualizar postagem', 'error')

                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, {...postagem, text: value}, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                toastAlerta('Postagem cadastrada com sucesso', 'sucess')

                retornar();
            } catch (error: any) {
                if (error.toString().includes('403')) {
  
                    toastAlerta('O token expirou, favor logar novamente', 'info')

                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrar a Postagem', 'error')
                }
            }
        }
    }


    function handleContentChange(content) {
        setValue(content)
    }

    


    return (
        <div className="w-full flex flex-row flex-nowrap mx-auto items-center dark:bg-dark-background3 h-full gap-4 ">
            <div className='flex-col items-center  w-full p-4' >
                <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

                <form onSubmit={gerarNovaPostagem} className="flex flex-col  gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo">Titulo da postagem</label>
                        <input
                            value={postagem.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            type="text"
                            placeholder="Titulo"
                            name="title"
                            required
                            className=" rounded p-3 dark:bg-dark-background2 outline-none "
                        />
                    </div>
                    <div className="w-full">
                        <label htmlFor="titulo">Texto da postagem</label>


                        {
                          
                          (isLoading || !id) &&
                            <Editor onContentChange={handleContentChange} initialContent={isLoading} />
                     
                         }
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <p>Tema da postagem</p>
                        <select name="tema" id="tema" className='border p-2 dark:bg-dark-background2 border-slate-800 rounded' onChange={(e) => handleTema(e.currentTarget.value)}>
                            <option value="" selected disabled>Selecione um tema</option>
                            {temas.map((tema) => (
                                <>
                                    <option value={tema.id} key={tema.id} selected={tema.id === postagem.theme.id} >{tema.description} </option>
                                </>
                            ))}
                        </select>
                    </div>
                    <button  type='submit' className='rounded disabled:bg-slate-200 bg-light-accent hover:bg-light-accentSelected text-white font-bold w-1/2 mx-auto block py-2'>
                        { id !== undefined ? 'Editar' : 'Cadastrar'}
                    </button>
                </form>

            </div>

        </div>
    );
}

export default FormularioPostagem;