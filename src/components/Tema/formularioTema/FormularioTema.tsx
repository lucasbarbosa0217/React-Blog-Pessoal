import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Theme from '../../../models/Theme';
import { atualizar, buscar, cadastrar } from '../../../services/Service';

function FormularioTema() {
    const [tema, setTema] = useState<Theme>({} as Theme);

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value
        })

        console.log(JSON.stringify(tema))
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                alert('Tema atualizado com sucesso')
                retornar()

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()
                } else {
                    alert('Erro ao atualizar o Tema')
                }

            }

        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                alert('Tema cadastrado com sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()
                } else {
                    alert('Erro ao cadastrar o Tema')
                }
            }
        }

        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/login');
        }
    }, [token]);

    return (
        <div className="bg-light-background3 m-4 dark:bg-dark-background3 flex flex-col p-4 max-w-[30rem] w-full self-center justify-center gap-2">
            <h1 className="text-4xl font-serif text-center my-8">
                {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
            </h1>

            <form className="flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className='flex flex-col'>
                    <label htmlFor="descricao">Descrição do tema:</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name='description'
                        className="bg-light-background2 dark:bg-dark-background2 p-2"
                        value={tema.description}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <button
                    className="rounded bg-dark-accent hover:bg-dark-accentSelected text-white py-2 flex justify-center"
                    type="submit"
                >
                    {id === undefined ? 'Cadastrar' : 'Editar'}
                </button>
            </form>
        </div>
    );
}

export default FormularioTema;
