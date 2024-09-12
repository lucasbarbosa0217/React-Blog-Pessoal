import React from 'react'
import { Link } from 'react-router-dom'
import { Eraser, PencilSimpleLine } from '@phosphor-icons/react'
import { Blog } from '../../models/Blog'


interface CardDeslogadoProps {
    post: Blog
}



function CardDeslogado({ post }: CardDeslogadoProps) {
    return (
        <>
        <Link to={`/blog/${post.urlPath}`} >
        <div className='flex flex-col overflow-hidden justify-between shadow-md bg-light-background3 dark:bg-dark-background3'>
            <header className='p-2 bg-light-accent text-dark-textContent'>Postagem</header>
            <div className="flex w-full p-4 gap-4 items-center">
                <img src={post.user?.photo} className='h-12 w-12 rounded-full' alt="Imagem de Perfil" />
                <h3 className='text-lg font-bold  text-center flex-grow'>{post.user?.name}</h3>
            </div>
            <div className='px-4 pb-4 flex flex-col gap-4'>
                <h4 className='text-lg font-semibold uppercase'>{post.title}</h4>
                <p>{post.text.substring(0 , 100)+"..."}</p>
                <p>Tema:{" "}{post.theme?.description}</p>
                <p>Data: {new Intl.DateTimeFormat(undefined, {
                    dateStyle: 'full',
                    timeStyle: 'medium',
                }).format(new Date(post.createdTimestamp))}</p>
            </div>
        </div>
        </Link>
        </>
    )
}

export default CardDeslogado
