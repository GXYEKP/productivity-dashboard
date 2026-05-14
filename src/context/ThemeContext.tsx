import {createContext , useState} from "react";

type ThemeContextType = {
    darkMode : boolean
    toggleTheme : () => void
}

export const ThemeContext = 
    createContext<ThemeContextType>({
        darkMode : false,
        toggleTheme : () => {}
    })

export const ThemeProvider = ({children}: {children : React.ReactNode}) => {

    const [darkMode, setDarkMode] = useState(false)

    const toggleTheme = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider
        value={{
            darkMode, 
            toggleTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}