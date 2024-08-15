import React, { useContext, useEffect, useState } from 'react';
import CardPostagem from '../CardPostagem/CardPostagem';
import { Blog } from '../../models/Blog';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { DNA } from 'react-loader-spinner';
import CardDeslogado from '../CardPostagem/CardDeslogado';
import { toastAlerta } from '../../utils/toasAlerts';



function ListaDeslogado() {


    const [postagens, setPostagens] = useState<Blog[]>([]);

    let navigate = useNavigate();



    async function buscarPostagens() {
        try {
            await buscar('/postagens', setPostagens, {
             
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')

           
            }
        }
    }

    useEffect(() => {
        buscarPostagens();
    }, [postagens.length]);

    return (
        <>

            <>
                {postagens.length === 0 && (
                    <DNA
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper mx-auto"
                    />
                )}
                <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {postagens.map((postagem) => (
                        <CardDeslogado key={postagem.id} post={postagem} />
                    ))}
                </div>
            </>
        </>
    );
}

export default ListaDeslogado;