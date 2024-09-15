import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Theme from '../Theme/Theme'

function Footer() {
    const { usuario, } = useContext(AuthContext)

    let footerComponent

    let data = new Date().getFullYear()

        footerComponent = 
            <div className="flex flex-wrap  p-4 justify-center bg-light-background2 dark:bg-dark-background2 ">
                <div className="container flex flex-wrap gap-y-4 items-center  min-h-fit flex-grow  ">
                    <p className='flex-grow font-medium flex-shrink-0'>LulucasBlog| Copyright: 2024 </p>
                    <div className='h-14'>
                        <Theme />

                    </div>

                </div>

            </div>
 
    

    return (
        <>
            {footerComponent}

        </>
    )
}

export default Footer