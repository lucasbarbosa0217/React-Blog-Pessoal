import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../utils/toasAlerts'
import ImageUploader from '../../components/ImageUploader/ImageUploader'
function Perfil() {
    let navigate = useNavigate()

    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            toastAlerta("Você precisa estar logado", "info")
            navigate("/login")
        }
    }, [usuario.token])

    return (
        <div className='container mx-auto m-4 overflow-hidden  p-4 flex flex-col items-center bg-dark-accent text-dark-textContent'>
            <img src={usuario.photo} alt={`Foto de perfil de ${usuario.name}`} className='rounded-full w-56 ' />
            <div className="">
                <p>Nome: {usuario.name} </p>
                <p>Email: {usuario.email}</p>
            </div>

            <ImageUploader />
        </div>
    )
}

export default Perfil