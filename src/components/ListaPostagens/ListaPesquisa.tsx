import React, { useContext, useEffect, useState } from 'react';
import CardPostagem from '../CardPostagem/CardPostagem';
import { Blog } from '../../models/Blog';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar, paginar } from '../../services/Service';
import { BallTriangle, DNA } from 'react-loader-spinner';
import CardDeslogado from '../CardPostagem/CardDeslogado';
import { toastAlerta } from '../../utils/toasAlerts';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';



function ListaPesquisa() {

    const { pesquisa} = useParams<{ pesquisa: string }>();

    const [postagens, setPostagens] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageQuantity, setPageQuantity] = useState(0)
    const [paginasArray, setPaginasArray] = useState<number[]>([]);
    const [page, setPage] = useState(0)


    let navigate = useNavigate();


    function gerarArray(numero, limite) {
        let resultado = [];

        for (let i = -2; i <= 2; i++) {
            let valor = numero + i;
            if (valor > 0 && valor < limite && valor != limite-1 ) {
                resultado.push(valor);
            }
        }
        console.log(resultado)
        setPaginasArray(resultado)
    }



    async function buscarPostagens(page: number) {
        if(page != 0){
            if (page + 1 > pageQuantity || page < 0) {
                return
            }
        }
       
        try {
            setIsLoading(true);
            let paginas =  await paginar(`/postagens/pagina/pesquisa/${pesquisa}?size=${9}&page=${page}&sort=createdTimestamp,desc`);
            setPostagens(paginas.data.content)
            setPageQuantity(paginas.data.totalPages)
            setPage(paginas.data.pageable.pageNumber)
            setIsLoading(false);
            gerarArray(page, paginas.data.totalPages)

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')


            }
            setIsLoading(false);

        }
    }

    useEffect(() => {
        buscarPostagens(0);
    }, [pesquisa]);

    return (
        <>

            <>
                {isLoading ? (
                    <div className='p-8 w-full flex justify-center'>
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
                    
                ) :
                    postagens.length > 0 ?
                    <><div className=' p-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow'>
                        {postagens.map((postagem) => (
                            <CardDeslogado key={postagem.id} post={postagem} />
                        ))}
                    </div>
                            <div className='w-full flex justify-between p-4 items-center '>
                                <a href="#">
                                    <ArrowLeft size={32} onClick={() => { buscarPostagens(page - 1) }} />

                                </a>
                                <div className='flex gap-4 text-lg items-center'>
                                    <a key={0} href={"#"} onClick={() => buscarPostagens(0)} className={`${page == 0 && "text-xl font-bold"} hover:underline`}>{0 + 1}...</a>
                                    {paginasArray.map((pagina) => (
                                        <a key={pagina} href={"#"} onClick={() => buscarPostagens(pagina)} className={`${page == pagina && "text-xl font-bold"} hover:underline`}>{pagina + 1}</a>
                                    ))}
                                    <a key={pageQuantity - 1} href={"#"} onClick={() => buscarPostagens(pageQuantity - 1)} className={`${page == pageQuantity - 1 && "text-xl font-bold"} hover:underline`}>...{pageQuantity}</a>

                                </div>
                                <a href="#">

                                    <ArrowRight size={32} onClick={() => { buscarPostagens(page + 1) }} />
                                </a>
                            </div>

                    
                    </> :
                    "Não postaram nenhum blog ainda..."
            
            }
               
            </>
        </>
    );
}

export default ListaPesquisa;