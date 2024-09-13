import { useContext } from "react";
import lua from "../../assets/moon.png"
import star from "../../assets/star.png"

import { AuthContext} from "../../contexts/AuthContext";
import styles from "./glow.module.css"
import ListaDeslogado from "../../components/ListaPostagens/ListaDeslogado";

function Home() {

    const { usuario, handleLogin } = useContext(AuthContext);

    return (
        <>
            <div className=" container grid sm:grid-cols-1 md:grid-cols-3 mx-auto p-2 pt-8 gap-y-8 md:gap-x-24" >
                <div className="flex flex-col text-center sm:justify-center md:justify-start col-span-1">
                    <h1 className="text-4xl font-serif">Seja bem vindo ao blog do Lucas{usuario.name ? ", " + usuario.name : ""}</h1>
                    <p>Este blog é um projeto realizado durante o bootcamp de React/Java da <span className="font-bold">Generation Brazil</span>.
                        Este projeto é fullstack e o repositório do backend pode ser escontrado <a href="https://github.com/lucasbarbosa0217/Blog-Pessoal-Spring" >aqui</a>. </p>
                </div>
                <div className=" flex flex-col items-center w-full self-center  col-span-2">

                    <ListaDeslogado />
                 


                </div>
         

           
            </div>
        
            <div className={`flex items-center justify-center fixed ${styles.lua}`} >
                <img alt="Lua" src={lua} className={` ${styles.glow} w-[32rem] transition-all`}></img>
            </div>

            <div className={`flex items-center justify-center fixed w-screen h-screen ${styles.star}`} style={{
                backgroundImage: `url(${star})`
            }} >
            </div>
        </>
    )
}

export default Home;