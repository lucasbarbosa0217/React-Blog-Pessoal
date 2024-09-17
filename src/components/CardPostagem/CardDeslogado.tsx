import React from 'react'
import { Link } from 'react-router-dom'
import { Eraser, PencilSimpleLine } from '@phosphor-icons/react'
import { Blog } from '../../models/Blog'


interface CardDeslogadoProps {
    post: Blog
}



function CardDeslogado({ post }: CardDeslogadoProps) {

    const regex = /<img[^>]*src="([^"]*)"/i;
    const match = post.text.match(regex);



    return (
        <>
            <Link to={`/blog/${post.urlPath}`} >
                <div className='flex flex-col overflow-hidden justify-between shadow-md bg-light-background3 dark:bg-dark-background3 h-full max-h-96 rounded-lg'>

                    <div className='flex flex-col flex-grow '>
                        {match  ? <img src={`${match[1]}`} className='w-full max-h-[10rem] object-cover'></img>: "" }
                        
                        <div className='p-4 flex flex-col justify-between flex-grow'>
                            <h4 className='text-2xl font-semibold font-serif'>{post.title}</h4>
                            <p className="italic text-light-textDetail dark:text-dark-textDetail" dangerouslySetInnerHTML={{ __html: post.text.substring(0, 150) + "..." }}></p>
                            <div className='flex flex-row justify-between  bg-light-background2 dark:bg-dark-background2 p-2 mt-4 items-center rounded-md'>
                                <p className='font-bold'>{post.theme?.description}</p>
                                <p className="text-sm text-light-textDetail dark:text-dark-textDetail">{new Intl.DateTimeFormat(undefined, {
                                    dateStyle: 'short',
                                    timeStyle: 'medium',
                                }).format(new Date(post.createdTimestamp+"Z"))}</p>
                            </div>
                      

                        </div>

                    </div>
                </div>
            </Link>
        </>
    )
}

export default CardDeslogado
