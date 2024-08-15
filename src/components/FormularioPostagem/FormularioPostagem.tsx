import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Theme from '../../models/Theme';
import { Blog } from '../../models/Blog';
import { atualizar, buscar, cadastrar } from '../../services/Service';
import { toastAlerta } from '../../utils/toasAlerts';



function FormularioPostagem() {
    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [temas, setTemas] = useState<Theme[]>([]);

    const [tema, setTema] = useState<Theme>({
        id: 0,
        description: '',
        blog: null
    });

    const [postagem, setPostagem] = useState<Blog>({
        id: 0,
        title: '',
        text: '',
        createdTimestamp: '',
        updatedTimestamp: "",
        theme: null,
        user: null,
        comment: null
    });

    async function buscarPostagemPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        });
    }

    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
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
            console.log(tema);

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

        console.log({ postagem });

        if (id != undefined) {
            try {
                await atualizar(`/postagens`, postagem, setPostagem, {
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
                await cadastrar(`/postagens`, postagem, setPostagem, {
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

    const carregandoTema = tema.description === '';

    return (
        <div className="container flex flex-col mx-auto items-center dark:bg-light-background3 text-light-textContent">
            <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

            <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Titulo da postagem</label>
                    <input
                        value={postagem.title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Titulo"
                        name="title"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da postagem</label>
                    <input
                        value={postagem.text}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Texto"
                        name="text"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema da postagem</p>
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
                        <option value="" selected disabled>Selecione um tema</option>
                        {temas.map((tema) => (
                            <>
                                <option value={tema.id} >{tema.description}</option>
                            </>
                        ))}
                    </select>
                </div>
                <button disabled={carregandoTema} type='submit' className='rounded disabled:bg-slate-200 bg-light-accent hover:bg-light-accentSelected text-white font-bold w-1/2 mx-auto block py-2'>
                    {carregandoTema ? <span>Carregando</span> : id !== undefined ? 'Editar' : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default FormularioPostagem;