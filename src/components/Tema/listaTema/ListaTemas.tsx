import React, { useContext, useEffect, useState } from 'react';
import { BallTriangle, DNA } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Theme from '../../../models/Theme';
import { buscar } from '../../../services/Service';
import CardTemas from '../cardTemas/CardTemas';
import { toastAlerta } from '../../../utils/toasAlerts';

function ListaTemas() {
    const [temas, setTemas] = useState<Theme[]>([]);

    let navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                toastAlerta('O token expirou, favor logar novamente', 'info')

                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
           
            toastAlerta('Você precisa estar logado', 'info')

            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        buscarTemas();
    }, [temas.length]);
    return (
        <>
            {temas.length === 0 && (
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
            )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temas.map((tema) => (
                            <>
                                <CardTemas key={tema.id} tema={tema} />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTemas;