import React from 'react';


import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import './ModalPostagem.css'
import FormularioPostagem from '../FormularioPostagem/FormularioPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={<button className={`text-light-textContent text-start p-2 text-dark-textContent bg-light-background2 dark:bg-dark-background1 hover:bg-light-background1`}>Nova postagem</button>} modal>
                <div>
                    <FormularioPostagem />
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;