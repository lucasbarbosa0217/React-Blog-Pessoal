import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Blog } from '../../models/Blog'
import { AuthContext } from '../../contexts/AuthContext'
import { buscar, deletar } from '../../services/Service'
import { toastAlerta } from '../../utils/toasAlerts'
import { RotatingLines } from 'react-loader-spinner'



function DeletarPostagem() {
    const [postagem, setPostagem] = useState<Blog>({} as Blog)

    let navigate = useNavigate()

    const { id } = useParams<{ id: string }>()

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPost, setIsLoadingPost] = useState(true)


    async function buscarPorId(id: string) {
        try {
            setIsLoadingPost(true)
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: {
                    'Authorization': token
                }
            })
            setIsLoadingPost(false)

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')

                handleLogout()
            }
            setIsLoadingPost(false)

        }
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado', 'info')
            navigate('/login')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function retornar() {
        navigate("/admin/postagens")
    }

    async function deletarPostagem() {
        try {
            setIsLoading(true)
            await deletar(`/postagens/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            setIsLoading(false)

            toastAlerta('Postagem apagada com sucesso', 'sucess')

        } catch (error) {
            toastAlerta('Erro ao apagar a Postagem', 'error')
            setIsLoading(false)

        }

        retornar()
    }

    return (
        <div className='bg-light-background3 m-4 dark:bg-dark-background3 flex flex-col p-4 max-w-[30rem] w-full self-center justify-center gap-2 rounded-xl'>
            <h1 className='text-4xl font-serif text-center my-4'>Deletar Postagem</h1>

            <p className='text-center mb-4'>Você tem certeza de que deseja apagar a postagem a seguir?</p>

            <div className='flex flex-col overflow-hidden justify-between shadow-md border dark:border-dark-background2 bg-light-background3 dark:bg-dark-background3 rounded-xl'>
                <header className='p-2 bg-light-accent text-dark-textContent'>
                    Postagem
                </header>
                <div className="p-4">
                    <p className='text-2xl text-center'>{postagem.title}</p>
                    <p>{postagem.text}</p>
                </div>
                <div className="flex border-t-2 dark:border-dark-background2">
                    <button
                        className='w-full text-blue-500 py-2 border-r-2 dark:border-dark-background2 hover:bg-blue-500 hover:text-stone-50'
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        disabled={isLoading || isLoadingPost}
                        className={`w-full text-red-500 flex items-center justify-center font-black hover:bg-red-500 hover:text-stone-50 ${(isLoading || isLoadingPost) && "bg-slate-400 hover:bg-slate-400"}`}
                        onClick={deletarPostagem}
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
    )
}

export default DeletarPostagem
