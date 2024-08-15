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
import { BallTriangle } from "react-loader-spinner";


export default function Post() {
    const { urlpath: urlPath } = useParams<{ urlpath: string }>();
    const [post, setPost] = useState<Blog | null>(null);
    const [relativeTime, setRelativeTime] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false)

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


    return (
        <div className={styles.main}>
            {post ? (
                <main className="flex flex-col m-4">
                    <main className={`px-6 py-12 max-w-[45rem] self-center flex flex-col gap-4 bg-light-background3 dark:bg-dark-background3`}>
                        <div className={styles.headerblog}>
                            <p>{relativeTime}</p>
                            <div className={`${styles.divider} bg-light-textDetail`}></div>
                            <a href={`/post/theme/${post.theme?.description ?? ''}`}>
                                <p>{post.theme?.description}</p>
                            </a>
                        </div>
                        <h1 className="text-4xl font-serif">{post.title}</h1>
                        <p dangerouslySetInnerHTML={{ __html: post.text }}></p>
                    </main>
                    <aside className={`px-6 py-12 w-full max-w-[45rem] self-center items-center flex flex-row gap-4 bg-light-background3 dark:bg-dark-background3 m-4 ` }>
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

                </main>
            ) : 
                <div className='w-full flex justify-center'>
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
            }
        </div>
    );
}
