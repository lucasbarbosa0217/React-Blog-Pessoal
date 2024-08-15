import styles from "./blogStyle.module.css";
import { parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Comment from "../Comment/Comment";
import { Blog } from "../models/Blog";
import { buscar,  cadastrar, criarComentario } from "../services/Service";
import { AuthContext } from "../contexts/AuthContext";
import { toastAlerta } from "../utils/toasAlerts";


export default function Post() {
    const { urlpath: urlPath } = useParams<{ urlpath: string }>();
    const [post, setPost] = useState<Blog | null>(null);
    const [relativeTime, setRelativeTime] = useState<string>("");
    const [createdComment, setCreatedComment] = useState<Comment | null>(null);
    const [errorComment, setErrorCreatedComment] = useState<{ error: string | null, errors?: Record<string, string> }>({ error: null });
    const [errorCommentHtml, setErrorCreatedCommentHtml] = useState<JSX.Element>(<></>);
    const [createdCommentsList, setCreatedCommentsList] = useState<Array<Comment>>([])
    const commentRef = useRef<HTMLTextAreaElement | null>(null);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token;



    async function buscarPostagens() {
        try {
            await buscar('/postagens/urlPath/'+urlPath, setPost, {

            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta("O token expirou, favor logar novamente", "info")


            }
        }
    }


    useEffect(() => {
     buscarPostagens()
    }, [])
    




    useEffect(() => {
        if (post) {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const date = parseISO(post.createdTimestamp + "Z");
            const localDate = new Date(date.toLocaleString("en-US", { timeZone }));
            const relative = formatDistanceToNow(localDate, {
                addSuffix: true,
                locale: ptBR,
            });
            setRelativeTime(relative);
        }
    }, [post]);

    async function enviarComentario() {

        setIsLoading(true)
        if (!token) {
            toastAlerta("Você precisa estar logado para comentar.", "info")

            navigate('/login');
            return;
        }

 

        try {
            await cadastrar(`/comentario/comentar`, {
                text: commentRef.current?.value,
                blog: { id: post?.id }
            }, setCreatedComment, {
                headers: {
                    Authorization: token,
                }
            });

            setErrorCreatedComment({ error: null });

            if (createdComment) {
                const list = createdCommentsList;
                list.unshift(createdComment)
                setCreatedCommentsList(list)
                setCreatedComment(null)
                setIsLoading(false)
             
                toastAlerta("Comentário criado com sucesso", "sucess")

            }
            setIsLoading(false)

        } catch (e: any) {
            setIsLoading(false)

            if (e.status === 401 || e.status === 403) {
                setErrorCreatedComment({ error: "Você precisa fazer login." });
                handleLogout();
            } else if (e.status >= 500) {
                setErrorCreatedComment({ error: "Erro no servidor" });
            } else {
                setErrorCreatedComment({ error: e.response });
            }
        }
    }

    useEffect(() => {
        if (errorComment.error !== null) {
            setErrorCreatedCommentHtml(
                errorComment.errors ? (
                    <div>
                        {Object.keys(errorComment.errors).map((key) => (
                        errorComment.errors &&
                            <p key={key}>{errorComment.errors[key] ?? 'Erro desconhecido'}</p>
                        ))}
                    </div>
                ) : (
                    <p>{errorComment.error} <Link to="/login" className="underline text-blue-500">Fazer login</Link></p>
                )
            );
        }
    }, [errorComment]);

    return (
        <div className={styles.main}>
            {post && (
                <>
                    <main className={`${styles.mainblog} bg-light-background3 dark:bg-dark-background3 m-4 `}>
                        <div className={styles.headerblog}>
                            <p>{relativeTime}</p>
                            <div className={styles.divider}></div>
                            <a href={`/post/theme/${post.theme?.description ?? ''}`}>
                                <p>{post.theme?.description}</p>
                            </a>
                        </div>
                        <h1>{post.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: post.text }}></p>
                    </main>
                    <aside className={`${styles.userPost} bg-light-background2 dark:bg-dark-background2`}>
                        <img
                            className={styles.userImage}
                            src={post.user?.photo ?? ''}
                            alt="User Profile"
                        />
                        <div>
                            <p>
                                <b>Autor:</b> {post.user?.name}
                            </p>
                            <p>
                                <b>Email: </b>
                                <a href={`mailto:${post.user?.email}`}> {post.user?.email} </a>
                            </p>
                            <p className={styles.userDescription}>
                                <i></i>
                            </p>
                        </div>
                    </aside>

                    <section className={`${styles.commentSection} bg-light-background2 dark:bg-dark-background2`}>
                        <div className={styles.makeComment}>
                            <h2>Deixe um comentário:</h2>
                            <textarea
                                ref={commentRef}
                                maxLength={400}
                                className="bg-light-background3 dark:bg-dark-background1 dark:text-light-textContent font-sans"
                            ></textarea>
                            <div className={styles.error}>
                                {errorComment.error && errorCommentHtml}
                            </div>
                            <button disabled={isLoading} className={`${isLoading && "bg-red-500"} bg-dark-accent p-2 `}onClick={enviarComentario}>Enviar comentário</button>
                        </div>
                        <section className={styles.comments}>

                            {createdCommentsList && createdCommentsList.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))}

                            {post.comment && post.comment.map((comment, index) => (
                                <Comment key={index} comment={comment} />
                            ))}
                        </section>
                    </section>
                </>
            )}
        </div>
    );
}
