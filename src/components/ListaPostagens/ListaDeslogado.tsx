import React, { useContext, useEffect, useState } from 'react';
import CardPostagem from '../CardPostagem/CardPostagem';
import { Blog } from '../../models/Blog';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { BallTriangle, DNA } from 'react-loader-spinner';
import CardDeslogado from '../CardPostagem/CardDeslogado';
import { toastAlerta } from '../../utils/toasAlerts';



function ListaDeslogado() {


    const [postagens, setPostagens] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);


    let navigate = useNavigate();



    async function buscarPostagens() {
        try {
            setIsLoading(true);
            await buscar('/postagens', setPostagens, {

            });
            setIsLoading(false);

        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')

                setIsLoading(false);

            }
        }
    }

    useEffect(() => {
        buscarPostagens();
    }, [postagens.length]);

    return (
        <>

            <>
                {isLoading ? (
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
                    
                ) :
                    postagens.length > 0 ?
                    <div className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-grow'>
                        {postagens.map((postagem) => (
                            <CardDeslogado key={postagem.id} post={postagem} />
                        ))}
                    </div> :
                    "Não postaram nenhum blog ainda..."
            
            }
                
              
            </>
        </>
    );
}

export default ListaDeslogado;