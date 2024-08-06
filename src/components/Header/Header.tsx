import { Link, useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate()

    function handleNavigate(){
        navigate("/login")
    }
    return (
        <header
            className="sm:grid-cols-1 gap-y-4 lg:grid-cols-12 grid min-h-8 w-full bg-light-background3 dark:bg-dark-background3 p-4"
        >
            <div
                className="sm:col-span-1 lg:col-span-3 font-serif text-4xl font-black italic text-center"
            >
                <Link to="/Home">
                    <h1>
                        Lulucas
                        <span className="font-thin not-italic text-light-accent">Blog</span>
                    </h1>
                </Link>
            </div>

            <form
                className="sm:col-span-1 lg:col-span-4 bg-light-background2 dark:bg-dark-background2 flex"
            >
                <input
                    type="search"
                    className="bg-transparent outline-none flex-grow"
                    placeholder="Pesquisar..."
                />
                <button className="flex p-1 items-center">
                    <span className="material-symbols-outlined text-2xl">search</span>
                </button>
            </form>

            <div className="sm:col-span-1 lg:col-span-5 flex justify-end items-center gap-4">
                <div className="flex items-center">
                    <Link to="/categorias" className="text-light-accent visited:text-light-accentActive hover:text-light-accentSelected">Categorias</Link>
                </div>
                <button className="flex p-1 items-center" onClick={handleNavigate}>
                    <span className="material-symbols-outlined text-3xl h-full text-light-accent">account_circle</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
