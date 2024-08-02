import {useEffect, useState} from "react";

import styles from "./theme.module.css";
function Theme() {
    const [selectedOption, setSelectedOption] = useState("system");

    useEffect(() => {
        const savedOption = localStorage.getItem("selectedTheme");
        if (savedOption) {
            setSelectedOption(savedOption);
            applyTheme(savedOption);
        } else {
            applySystemTheme();
        }
    }, []);

    const applyTheme = (theme) => {
        if (theme === "system") {
            applySystemTheme();
        } else if (theme === "dark") {
            document.body.classList.remove("system-mode");
            document.body.classList.remove("light-mode");
            document.body.classList.add("dark-mode");
        } else if (theme === "light") {
            document.body.classList.remove("system-mode");
            document.body.classList.remove("dark-mode");
            document.body.classList.add("light-mode");
        }
    };

    const applySystemTheme = () => {
        document.body.classList.remove("light-mode");
        document.body.classList.remove("dark-mode");
        document.body.classList.add("system-mode");
    };

    const handleOptionChange = (event) => {
        const newOption = event.target.value;
        setSelectedOption(newOption);
        localStorage.setItem("selectedTheme", newOption);
        applyTheme(newOption);
    };
    return (
        <div className={styles.themeSelector}>
            <div className={styles.icon}>
                <span className="material-symbols-outlined">dark_mode</span>
            </div>

            <form className={styles.themeForm}>
                <label className={styles.radio}>
                    <input
                        type="radio"
                        name="theme"
                        value="system"
                        checked={selectedOption === "system"}
                        onChange={handleOptionChange}
                    />
                    System
                </label>

                <label className={styles.radio}>
                    <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={selectedOption === "dark"}
                        onChange={handleOptionChange}
                    />
                    Dark Mode
                </label>

                <label className={styles.radio}>
                    <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={selectedOption === "light"}
                        onChange={handleOptionChange}
                    />
                    Light Mode
                </label>
            </form>
        </div>
    );
}

export default Theme;
