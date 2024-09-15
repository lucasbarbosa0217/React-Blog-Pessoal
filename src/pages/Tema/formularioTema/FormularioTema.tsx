import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Theme from '../../../models/Theme';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { toastAlerta } from '../../../utils/toasAlerts';
import { RotatingLines } from 'react-loader-spinner';

function FormularioTema() {
    const [tema, setTema] = useState<Theme>({} as Theme);

    let navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingTheme, setIsLoadingTheme] = useState(false)


    async function buscarPorId(id: string) {
        setIsLoadingTheme(true)
        try{
            await buscar(`/temas/${id}`, setTema, {
                headers: {
                    Authorization: token,
                },
            });
            setIsLoadingTheme(false)

        }catch(e){
            setIsLoadingTheme(false)

        }
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
        setIsLoading(true)
        if (id !== undefined) {
            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema atualizado com sucesso', 'sucess')
                setIsLoading(false)

                retornar()

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')

                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar tema', 'error')
                }
                setIsLoading(false)


            }

        } else {
            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                    toastAlerta('Tema cadastrado com sucesso', 'sucess')
                setIsLoading(false)


            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente', 'info')

                    handleLogout()
                } else {
                   
                    toastAlerta('Erro ao cadastrar tema', 'error')

                }
                setIsLoading(false)

            }
        }

        retornar()
    }

    function retornar() {
        navigate("/admin/temas")
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')

            navigate('/login');
        }
    }, [token]);

    return (
        <div className="rounded-xl bg-light-background3 m-4 dark:bg-dark-background3 flex flex-col p-4 max-w-[30rem] w-full self-center justify-center gap-2">
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
                        className="bg-light-background2 dark:bg-dark-background2 p-2 rounded-lg"
                        value={tema.description}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
              

                <button disabled={isLoading || isLoadingTheme} type='submit' className={`mt-4   bg-light-accent hover:bg-light-accentSelected text-white font-bold w-full rounded-lg mx-auto  py-2 flex justify-center
                                ${(isLoading || isLoadingTheme) && "bg-slate-500 hover:bg-slate-500"}`}>
                    {(isLoading || isLoadingTheme) ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> : id !== undefined ? 'Editar' : 'Cadastrar'}


                </button>
            </form>
        </div>
    );
}

export default FormularioTema;
