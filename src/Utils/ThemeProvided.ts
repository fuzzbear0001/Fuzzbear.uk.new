// Theme-system by Scarlot Ruskipy; \\
import React from "react";

export default function ThemeSystem(Props: ThemeSystemProps) {
    const [theme, setTheme] = React.useState(Props.default);

    React.useEffect(() => {
        if (Props.type === "cookies") {
            const theme = document.cookie.split(";").find((cookie) => cookie.includes("theme"));
            if (theme) {
                setTheme(theme.split("=")[1]);
            }
        } else if (Props.type === "localstorage") {
            const theme = localStorage.getItem("theme");
            if (theme) {
                setTheme(theme);
            }
        }
    }, []);

    React.useEffect(() => {
        if (Props.type === "cookies") {
            document.cookie = `theme=${theme}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
        } else if (Props.type === "localstorage") {
            localStorage.setItem("theme", theme);
        }

        var hasTheme = document.querySelector(Props.selector)?.classList.contains("dark") || document.querySelector(Props.selector)?.classList.contains("light");

        if (hasTheme) {
            var _theme = document.querySelector(Props.selector)!.classList.contains("dark") ? "dark" : "light";
            document.querySelector(Props.selector)!.classList.replace(_theme, theme)
        } else {
            document.querySelector(Props.selector)!.classList.add(theme);
        }
    }, [theme]);

    React.useEffect(() => {
        var Loop: any;

        if (Props.type === "cookies") {
            Loop = setInterval(() => {
                const theme = document.cookie.split(";").find((cookie) => cookie.includes("theme"));
                if (theme) {
                    setTheme(theme.split("=")[1]);
                }
            }, 250);
        } else if (Props.type === "localstorage") {
            Loop = setInterval(() => {
                const theme = localStorage.getItem("theme");
                if (theme) {
                    setTheme(theme);
                }
            }, 250);
        }

        return () => {
            if (Loop) {
                clearInterval(Loop);
            }
        }
    }, [])

    return {
        theme,
        setTheme
    }
}

// Types \\
interface ThemeSystemProps {
    default: string;
    type: "cookies" | "localstorage";
    selector: string;
}