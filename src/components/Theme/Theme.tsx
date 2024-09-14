import { useEffect, useState } from "react";
import "./theme.css";
import { Moon } from "@phosphor-icons/react";

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
        <div className="text-dark-textContent bg-light-accent text-light-text-accent  flex items-center justify-center flex-grow-0 h-full  rounded-2xl">
            <div className="px-2 flex items-center justify-center">
                <Moon size={32}/>
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
                <label className="option flex items-center justify-center gap-2 w-24 h-full cursor-pointer ">
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
                <label className="option flex items-center justify-center gap-2 w-24 h-full cursor-pointer rounded-r-lg">
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
