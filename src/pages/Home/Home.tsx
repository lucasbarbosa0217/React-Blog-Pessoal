import { useContext } from "react";
import lua from "../../assets/moon.png"
import { AuthContext} from "../../contexts/AuthContext";
import styles from "./glow.module.css"
import ListaDeslogado from "../../components/ListaPostagens/ListaDeslogado";

function Home() {

    const { usuario, handleLogin } = useContext(AuthContext);

    return (
        <>
            <div className=" bg-light-background3  dark:bg-dark-background1 p-8 flex-grow grid sm:grid-cols-1 md:grid-cols-2" >

                <div className="flex justify-center flex-col text-center p-8">
                    <h1 className="text-4xl font-serif">Seja bem vindo ao blog do Lucas{usuario.name ? ", "+usuario.name : ""}</h1>
                    <p>Este blog é um projeto realizado durante o bootcamp de React/Java da <span className="font-bold">Generation Brazil</span>.
                        Este projeto é fullstack e o repositório do backend pode ser escontrado <a href="https://github.com/lucasbarbosa0217/Blog-Pessoal-Spring" >aqui</a>. </p>
                </div>

                <div className="flex items-center justify-center">

                    <img alt="Lua" src={lua} className={` ${styles.glow} w-[20rem] transition-all`}></img>
                </div>
            </div>
            <ListaDeslogado />

        </>
    )
}

export default Home;