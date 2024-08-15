import React from 'react';


import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';

import './ModalPostagem.css'
import FormularioPostagem from '../FormularioPostagem/FormularioPostagem';

function ModalPostagem() {
    return (
        <>
            <Popup
                trigger={<button className=' rounded px-4 hover:bg-white hover:text-indigo-800'>Nova postagem</button>} modal>
                <div>
                    <FormularioPostagem />
                </div>
            </Popup>
        </>
    );
}

export default ModalPostagem;