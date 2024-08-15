import { Link, useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from 'react';
import User from '../../models/User';
import { cadastrarUsuario } from '../../services/Service';
import { RotatingLines } from 'react-loader-spinner';
import { toastAlerta } from '../../utils/toasAlerts';

function Cadastro() {
    let navigate = useNavigate();

    const [confirmaSenha, setConfirmaSenha] = useState<string>('');
    const [usuario, setUsuario] = useState<User>({
        id: 0,
        name: '',
        email: '',
        password: '',
        photo: '',
        blog: [],
        comment: [],
        roles: []
    });

    const [usuarioResposta, setUsuarioResposta] = useState<User>({
        id: 0,
        name: '',
        email: '',
        password: '',
        photo: '',
        blog: [],
        comment: [],
        roles: []
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (usuarioResposta.id !== 0) {
            back();
        }
    }, [usuarioResposta]);

    function back() {
        navigate('/login');
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmaSenha(e.target.value);
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        if (confirmaSenha === usuario.password && usuario.password.length >= 8) {
            try {
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta);
                toastAlerta('Usuário cadastrado com sucesso', 'sucess')

            } catch (error) {
                toastAlerta('Erro ao cadastrar o Usuário', 'error')

            }
        } else {
            toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'error')

            setUsuario({ ...usuario, password: '' });
            setConfirmaSenha('');
        }
        setIsLoading(false);
    }

    return (
        <div className="bg-light-background3 m-4 dark:bg-dark-background3 flex flex-col p-4 max-w-[30rem] w-full self-center justify-center gap-2">
            <h1 className="text-4xl font-serif text-center">Cadastrar</h1>
            <form className="flex flex-col gap-4" onSubmit={cadastrarNovoUsuario}>
                <div className="flex flex-col">
                    <label htmlFor="name">Nome:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome"
                        className="bg-light-background2 dark:bg-dark-background2 p-2"
                        value={usuario.name}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        className="bg-light-background2 dark:bg-dark-background2 p-2"
                        value={usuario.email}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="photo">Foto:</label>
                    <input
                        type="text"
                        id="photo"
                        name="photo"
                        placeholder="Foto"
                        className="bg-light-background2 dark:bg-dark-background2 p-2"
                        value={usuario.photo}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Senha"
                        className="bg-light-background2 dark:bg-dark-background2 p-2"
                        value={usuario.password}
                        onChange={atualizarEstado}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="confirmarSenha">Confirmar Senha:</label>
                    <input
                        type="password"
                        id="confirmarSenha"
                        name="confirmarSenha"
                        placeholder="Confirmar Senha"
                        className="bg-light-background2 dark:bg-dark-background2 p-2"
                        value={confirmaSenha}
                        onChange={handleConfirmarSenha}
                    />
                </div>
                <div className="flex justify-around w-full gap-8">
                    <button className="rounded bg-red-400 hover:bg-red-900 text-white w-1/2 py-2" onClick={back}>
                        Cancelar
                    </button>
                    <button type="submit" className="rounded bg-dark-accent hover:bg-dark-accentSelected text-white w-1/2 py-2 flex justify-center">
                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Cadastrar</span>}
                    </button>

                </div>
                <p className='text-center mt-4'>Já tem uma conta?{" "}
                    <Link to="/login" className='text-blue-500 underline' >Entrar</Link>

                </p>
            </form>
        </div>
    );
}

export default Cadastro;
