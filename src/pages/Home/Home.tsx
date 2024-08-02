import styles from "./home.module.css";

function Home() {
    return (
        <>
            <header className={styles.header}>
                <h1>LULUBLOG</h1>
                <div className={styles.search}>
                    <input type="search"/>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </div>
                <div className={styles.profile}>
                    <span className="material-symbols-outlined">
                    person
                    </span>
                </div>
            </header>

            <div className={styles.main}>
            <main className={styles.container}>
                <h2>Postagens:</h2>
            </main>
            </div>
        </>
    )
}

export default Home;