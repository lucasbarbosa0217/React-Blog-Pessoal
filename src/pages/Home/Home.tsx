import lua from "../../assets/moon.png"
function Home() {
    return (
        <>
            <div className=" bg-light-background3 m-4  dark:bg-dark-background3 flex-grow grid sm:grid-cols-1 md:grid-cols-2" >

                <div className="flex justify-center flex-col text-center p-8">
                    <h1 className="text-4xl font-serif">Seja bem vindo ao blog do Lucas</h1>
                    <p>Este blog é um projeto realizado durante o bootcamp de React/Java da <span className="font-bold">Generation Brazil</span>.
                        Este projeto é fullstack e o repositório do backend pode ser escontrado <a className="text-light-textLink" href="https://github.com/lucasbarbosa0217/Blog-Pessoal-Spring" >aqui</a>. </p>
                </div>

                <div className="flex items-center justify-center">

                    <img src={lua} className=""></img>
                </div>
             
            </div>
        </>
    )
}

export default Home;