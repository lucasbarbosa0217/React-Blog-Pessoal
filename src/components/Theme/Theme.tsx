import { useEffect, useState } from "react";
import "./theme.css";

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

        const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (event: MediaQueryListEvent) => {
            if (selectedOption === "system") {
                applySystemTheme();
            }
        };

        mediaQueryList.addEventListener('change', handleChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [selectedOption]);

    const applyTheme = (theme: string) => {
        const body = document.body;
        if (theme === "system") {
            applySystemTheme();
        } else if (theme === "dark") {
            body.classList.remove("light");
            body.classList.add("dark");
        } else if (theme === "light") {
            body.classList.remove("dark");
            body.classList.add("light");
        }
    };

    const applySystemTheme = () => {
        const body = document.body;
        body.classList.remove("light", "dark");
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add("dark");
        } else {
            body.classList.add("light");
        }
    };

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement;
        const newOption = target.value;
        setSelectedOption(newOption);
        localStorage.setItem("selectedTheme", newOption);
        applyTheme(newOption);
    };

    return (
        <div className="text-dark-textContent fixed bottom-16 right-0 bg-light-accentt border-2 border-light-accentSelected bg-dark-accent text-light-text-accent h-12 w-84 transform translate-x-72 transition-transform duration-400 flex items-center hover:translate-x-0">
            <div className="w-12 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">dark_mode</span>
            </div>

            <form className="flex h-full">
                <label className="option flex items-center justify-center gap-2 w-24 h-full cursor-pointer">
                    <input
                        type="radio"
                        name="theme"
                        value="system"
                        checked={selectedOption === "system"}
                        onChange={handleOptionChange}
                        className="hidden"
                    />
                    <span>System</span>
                </label>
                <label className="option flex items-center justify-center gap-2 w-24 h-full cursor-pointer">
                    <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={selectedOption === "dark"}
                        onChange={handleOptionChange}
                        className="hidden"
                    />
                    <span>Dark Mode</span>
                </label>
                <label className="option flex items-center justify-center gap-2 w-24 h-full cursor-pointerd">
                    <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={selectedOption === "light"}
                        onChange={handleOptionChange}
                        className="hidden"
                    />
                    <span>Light Mode</span>
                </label>
            </form>
        </div>
    );
}

export default Theme;
