import React from 'react'
import { Link } from 'react-router-dom'
import { Eraser, PencilSimpleLine } from '@phosphor-icons/react'
import { Blog } from '../../models/Blog'


interface CardPostagemProps {
    post: Blog
}



function CardPostagem({ post }: CardPostagemProps) {
    return (
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
            <div className="flex border-t-2 dark:border-dark-background2">
                <Link to={`/admin/editarPostagem/${post.id}`} className='text-blue-500 w-full border-r-2 dark:border-dark-background2 flex items-center justify-center py-2 no-underline hover:bg-light-background2 dark:hover:bg-dark-background2'>
                    <button className="flex items-center justify-between w-full px-8"><PencilSimpleLine size={24} /><span className='flex-grow'>Editar</span></button>
                </Link>
                <Link to={`/admin/deletarPostagem/${post.id}`} className='w-full flex items-center justify-center no-underline hover:bg-light-background2 dark:hover:bg-dark-background2'>
                    <button className="flex items-center justify-between w-full px-8 text-red-500"><Eraser size={24} /><span className='flex-grow'>Deletar</span></button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem
