import React, { useContext, useRef, useState } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Image } from '@tiptap/extension-image';
import { postarFoto } from '../../services/Service';
import { AuthContext } from '../../contexts/AuthContext';
import Youtube from '@tiptap/extension-youtube'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'




import './TiptapEditor.css';
import styles from "./post.module.css"
import { Code, ImageSquare, ListBullets, ListNumbers, TextBolder, TextItalic } from '@phosphor-icons/react';
import "./editor.css"
import { YoutubeLogo } from '@phosphor-icons/react/dist/ssr';


interface iEditor {
    onContentChange: Function;
    initialContent?: string
}



const TiptapEditor = ({ onContentChange, initialContent }: iEditor) => {
    const [content, setContent] = useState(initialContent ? initialContent : "");

    const { usuario } = useContext(AuthContext);

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Youtube,
            Image.configure({
                inline: true,
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
            if (onContentChange) {
                onContentChange(editor.getHTML());
            }
        },
        onCreate: ({ editor }) => {
            setContent(editor.getHTML());
            if (onContentChange) {
                onContentChange(editor.getHTML());
            }
        }    
    });

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        console.log(formData.get("file"))
        try {
            const response = await postarFoto("/postagens/foto", formData, {
                headers: {
                    Authorization: usuario.token,
                },
            });
            return response; // Ajuste conforme a estrutura da resposta
        } catch (error) {
            console.error('Image upload failed', error);
            return null;
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const imageUrl = await uploadImage(file);
            if (imageUrl) {
                editor.chain().focus().setImage({ src: imageUrl }).run();
            }
        }
    };

    const toggleBold = (e) => {
        e.preventDefault();
        editor.chain().focus().toggleBold().run();
    };

    const toggleItalic = (e) => {
        e.preventDefault();
        editor.chain().focus().toggleItalic().run();
    };

    const toggleHeading = (e) => {
        e.preventDefault();
        editor.chain().focus().toggleHeading({ level: 2 }).run()


  
    }

    const toggleBullet = (e) => {
        e.preventDefault();
        editor.chain().focus().toggleBulletList().run();

    }

    const toggleOrderedList = (e) => {
        e.preventDefault();
        editor.chain().focus().toggleOrderedList().run()
    }

    const toggleCode = (e) => {
        e.preventDefault();
        editor.chain().focus().toggleCode().run()
    }

    const setHorizontalRule = (e) => {
        e.preventDefault();
        editor.chain().focus().setHorizontalRule();
    }




    const addYoutubeVideo = () => {
        const url = prompt('Enter YouTube URL')

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width:  400,
                height:  225,
            })
        }
    }

    const file = useRef(null);

    return (
        <div className='bg-dark-background2 w-full max-w-[47rem] p-4 mx-auto rounded-lg'>
            <div className="editor-buttons w-full max-w-[45rem] mx-auto">
                <button onClick={toggleBold}><TextBolder/></button>
                <button onClick={toggleItalic}><TextItalic/></button>                
                <button onClick={toggleHeading}>H2</button>
                <button onClick={toggleBullet}><ListBullets/></button>
                <button onClick={toggleOrderedList}><ListNumbers/></button>
                <button onClick={toggleCode}><Code /></button>
                <button onClick={addYoutubeVideo}><YoutubeLogo/></button>
                <button onClick={(e) => {
                    file.current.click()
                }}>
                    <ImageSquare/>
                </button>

                {/* Botão de upload personalizado */}
             
                    <input
                        type="file"
                        className="file"
                        onChange={handleImageUpload}
                        ref={file}
                    ></input>
           
            </div>

            <EditorContent editor={editor} className={`w-full border dark:border-dark-background1 bg-dark-background1 max-w-[45rem] p-4 mx-auto min-h-[24rem] max-h-[50rem] overflow-auto flex flex-row flex-nowrap ${styles.post}`} />
        </div>
    );
};

export default TiptapEditor;
