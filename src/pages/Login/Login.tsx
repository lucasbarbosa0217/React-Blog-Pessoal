import { useNavigate, Link } from 'react-router-dom'
import Button from '../../components/Button/Button'

import { ChangeEvent, useContext, useEffect, useState} from 'react';
import UserLogin from '../../models/UserLogin';
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

const Login = () => {

    let navigate = useNavigate();

    const [userLogin, setUserLogin] = useState<UserLogin>(
        {} as UserLogin
    );

    const { usuario, handleLogin } = useContext(AuthContext);

    const { isLoading } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(userLogin)
    }

    return (

        <div className=" bg-light-background3 m-4  dark:bg-dark-background3 flex flex-col p-4 max-w-[30rem] w-full self-center justify-center gap-2" >
            <h1 className="text-4xl font-serif text-center">Login</h1>
            <form className="flex flex-col gap-4" onSubmit={login}>
             
                <div className='flex flex-col'>
                    <label htmlFor="email">Email:</label>
                    <input placeholder="example@email.com"
                        type="email"
                        name="email"
                        id="email"
                        className='bg-light-background2 dark:bg-dark-background2 p-2'
                        value={userLogin.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password">Senha:</label>
                    <input type="password"
                        name="password"
                        id="password"
                        className='bg-light-background2 dark:bg-dark-background2 p-2'
                        value={userLogin.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                </div>

                <button type='submit' className="rounded bg-dark-accent hover:bg-dark-accentSelected text-white py-2 flex justify-center">
                    {isLoading ? <RotatingLines
                        strokeColor="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="24"
                        visible={true}
                    /> :
                        <span>Entrar</span>}
                </button>

            </form>
            <p className='text-center mt-4'>Ainda não tem uma conta?{" "}
                <Link to="/cadastro" >Cadastre-se</Link>

            </p>

        </div>
    )
}

export default Login