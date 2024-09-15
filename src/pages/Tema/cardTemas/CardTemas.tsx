import React from 'react'
import { Link } from 'react-router-dom'
import Theme from '../../../models/Theme'
import { Eraser, PencilSimpleLine } from '@phosphor-icons/react'

interface CardTemaProps {
    tema: Theme
}

function CardTemas({ tema }: CardTemaProps) {
    return (
        <div className='flex flex-col overflow-hidden rounded-xl justify-between shadow-md bg-light-background3 dark:bg-dark-background3 '>
            <header className='p-2 bg-light-accent text-dark-textContent'>Tema</header>
            <p className='p-4 text-2xl text-center h-full'>{tema.description}</p>
            <div className="flex border-t-2  dark:border-dark-background2">
                <Link to={`editarTema/${tema.id}`} className=' text-blue-500 w-full border-r-2 dark:border-dark-background2 flex items-center justify-center py-2 no-underline hover:bg-light-background2 dark:hover:bg-dark-background2'>
                    <button className="flex items-center justify-between w-full px-8"><PencilSimpleLine size={24} /><span className='flex-grow'>Editar</span></button>
                </Link>
                <Link to={`deletarTema/${tema.id}`} className=' w-full flex items-center justify-center no-underline hover:bg-light-background2 dark:hover:bg-dark-background2'>
                    <button className="flex items-center justify-between w-full px-8 text-red-500 "><Eraser size={24} /><span className='flex-grow'>Apagar</span></button>
                </Link>
            </div>
        </div>
    )
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
export default CardTemas