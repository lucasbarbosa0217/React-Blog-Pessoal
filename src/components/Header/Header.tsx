import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { toastAlerta } from "../../utils/toasAlerts";

function Header() {
    let navigate = useNavigate()

  


    const { usuario, handleLogout } = useContext(AuthContext)


    function handleNavigate() {

        if (usuario.token){
            navigate("/perfil")
        }else{
            navigate("/login")
        }
    }

    function logout() {
        handleLogout()
        toastAlerta('Usuário deslogado com sucesso', 'sucess')

        navigate('/login')
    }


    function isAdmin(){
        return usuario && usuario.role && usuario.role.some(papel => papel.name === "ROLE_ADMIN")
    }

    return (
        <header
            className="  min-h-8 w-full bg-light-background3 dark:bg-dark-background3 p-4"
        >

            <div className="grid sm:grid-cols-1 lg:grid-cols-12  container gap-y-4  mx-auto">
                <div
                    className="sm:col-span-1 lg:col-span-3 font-serif text-4xl font-black italic text-center"
                >
                    <Link to="/Home" className="text-light-textContent !decoration-transparent dark:!text-dark-textContent">
                        <h1>
                            Lulucas
                            <span className="font-thin not-italic text-light-accent">Blog</span>
                        </h1>
                    </Link>
                </div>

                <form
                    className="sm:col-span-1 lg:col-span-4 bg-light-background2 dark:bg-dark-background2 flex rounded-2xl"
                >
                    <input
                        type="search"
                        className="bg-transparent outline-none flex-grow pl-2"
                        placeholder="Pesquisar..."
                    />
                    <button className="flex p-1 items-center">
                        <span className="material-symbols-outlined text-2xl">search</span>
                    </button>
                </form>

                <nav className="sm:col-span-1 lg:col-span-5 flex justify-end items-center gap-4">
                    <div className="flex items-center gap-4">
                        {
                            usuario.token ?
                                <>
                                    <Link to="" onClick={logout} className="text-light-accent  hover:text-light-accentSelected">Sair</Link>

                                    {isAdmin() ?
                                        <Link to='/admin' className="text-light-accent  hover:text-light-accentSelected">Admin</Link>
                                        : ""
                                    }

                                </>
                                :
                                <>
                                    <Link to="/cadastro" className="text-light-accent  hover:text-light-accentSelected">Cadastro</Link>
                                    <Link to="/login" className="text-light-accent  hover:text-light-accentSelected">Login</Link>
                                </>
                        }

                    </div>
                    <button className="flex p-1 items-center" onClick={handleNavigate}>
                        <span className="material-symbols-outlined text-3xl h-full text-light-accent">account_circle</span>
                    </button>
                </nav>

            </div>
            
        </header>
    );
}

export default Header;
