import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {
    const { usuario, } = useContext(AuthContext)

    let footerComponent

    let data = new Date().getFullYear()

    if(usuario.token) {
        footerComponent = 
            <div className="flex justify-center bg-light-accent text-dark-textContent h-16">
                <div className="container flex flex-col items-center py-4">
                    <p className=' font-medium'>Blog pessoal Generation | Copyright: 2024 </p>


                </div>
            </div>
 
    }

    return (
        <>
            {footerComponent}

        </>
    )
}

export default Footer