import React, { useContext, useRef, useState } from 'react';
import Button from '../Button/Button';
import { Upload } from '@phosphor-icons/react';
import { postarFoto } from '../../services/Service';
import { AuthContext } from '../../contexts/AuthContext';
import { toastAlerta } from '../../utils/toasAlerts';

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const {usuario, handleLogout} = useContext(AuthContext);

    const inputFile = useRef<HTMLInputElement | null>(null);

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData.get("file"))
        try {
            const response = await postarFoto("/usuarios/cadastrar/foto", formData, {
                headers: {
                    Authorization: usuario.token,
                },
            });
            toastAlerta("Imagem atualizada com sucesso!", "sucess")
        } catch (error) {
            if(error.toString().includes("403")){
                handleLogout()
                toastAlerta("Token expirou", "error");
            }

            return null;

        }
    };

    const handleImageUpload = async () => {
        const file = inputFile.current.files[0];

        if (file) {
            const imageUrl = await uploadImage(file);
        }
    };

    return (
        <div className='bg-light-background3 dark:bg-dark-background3 gap-4 flex flex-col items-center w-full max-w-72 text-light-textContent dark:text-dark-textContent p-4 rounded-xl shadow-xl'>
            <button type='button'
                onClick={() => {
                    inputFile.current.click();
                }}
                className='flex justify-center items-center gap-2 bg-light-background1 dark:bg-dark-background1 w-full p-4 rounded-lg'>
                Selecionar imagem <Upload /></button>
            <input type="file" accept="image/*" onChange={handleImageChange} className='hidden' ref={inputFile} />
            {selectedImage && (
                <div className='flex flex-col w-full items-center gap-4'>
                    <img src={selectedImage} alt="Selected" className='w-56 h-56 object-cover rounded-full' />
                    <Button onClick={handleImageUpload}>Editar imagem de perfil</Button>

                </div>

            )}
        </div>
    );
};

export default ImageUploader;
