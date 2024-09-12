import React, { useContext, useEffect, useState } from 'react'
import Button from '../Button/Button'
import { buscar, criarComentario } from '../../services/Service';
import { Comment } from '../../models/Comment';
import { AuthContext } from '../../contexts/AuthContext';
import { toastAlerta } from '../../utils/toasAlerts';
import { useNavigate } from 'react-router-dom';
import { DotsThree, Hamburger } from '@phosphor-icons/react';
import { BallTriangle } from 'react-loader-spinner';

interface ICriarComentario {
    id: string
    children?: React.ReactNode;
}


const CriarComentario: React.FC<ICriarComentario> = ({ id, children }) => {

    const [comentario, setComentario] = useState<Comment>({ text: "", blog: { id: id } } as Comment);
    const [listaComentarios, setListaComentarios] = useState<Comment[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;
    let navigate = useNavigate();
    const [isLoadingList, setIsLoadingList] = useState(true);

    useEffect(() => {
        try {
            console.log("post " +id)
            setIsLoadingList(true);
            buscar("/comentario/postagem/" + id, setListaComentarios, {}).then(
              () =>        setIsLoadingList(false))
        } catch (e: any) {
            toastAlerta("Erro ao buscar comentários", "error");
            setIsLoadingList(false)
        }

    }, [])


    function sendComment() {

        if (token) {
            try {
                criarComentario("/comentario/comentar", comentario, setListaComentarios, listaComentarios, {
                    headers: {
                        Authorization: token,
                    },
                });
                toastAlerta("Comentário feito com sucesso.", "sucess")
            } catch (e) {
                if (e.toString().includes('403')) {
                    handleLogout();
                    toastAlerta("Sessão expirou.", "info")
                    navigate("/login")
                } else {
                    toastAlerta("Erro ao criar comentário.", "error");
                }

            }

        } else {
            navigate("/login")
            toastAlerta("Usuário precisa estar logado", "error");
        }
    }

    function handleTextarea(e) {
        setComentario(
            {
                ...comentario,
                text: e.target.value
            })
    }

    return (
        <aside className={`px-6 py-12 w-full max-w-[45rem] self-center  flex flex-col flex-nowrap gap-4 bg-light-background3 dark:bg-dark-background3 m-4 mt-0 `}>
            <p>Quer deixar um comentario?</p>

            <textarea maxLength={240} value={comentario.text} onChange={handleTextarea} className='p-2 max-h-[10rem] min-h-fit h-16 bg-light-background2 dark:text-dark-textContent dark:bg-dark-background1'></textarea>
            <Button onClick={sendComment} >Enviar Comentário</Button>

            {!isLoadingList ? (
                listaComentarios.map((item) => {
                    console.log(item.user.id); 

                    return (
                        <div
                            key={item.id}
                            className="flex flex-row gap-4 border-b pb-4 border-light-background1 dark:border-dark-background2 items-center"
                        >
                            <img
                                src={item.user.photo}
                                alt={`Foto de perfil do ${item.user.name}`}
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="flex flex-col">
                                <p className="font-semibold text-orange-500">{item.user.name}</p>
                                <div className="bg-light-background2 dark:bg-dark-background2 p-2 rounded-md rounded-tl-none flex flex-col">
                                    <p className="flex self-end gap-2 text-sm font-light items-center">
                                        {new Date(item.updatedTimestamp + "Z").toLocaleTimeString().substring(0, 5)}
                                        {item.user.id === usuario.id && usuario && <DotsThree />}
                                    </p>
                                    {item.text}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex w-full justify-center mt-8">
                    <BallTriangle
                        height={100}
                        width={100}
                        radius={5}
                        color="#f97316"
                        ariaLabel="ball-triangle-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            )}

        </aside>
    )
}

export default CriarComentario