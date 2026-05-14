import { useTheme } from "../hooks/useTheme";

type Props = {value : string; onChange : (v : string) => void}

export default function SearchBar({value, onChange} : Props) {
    
    const {darkMode} = useTheme()

    return (
        <input
        type="text"
        placeholder="search..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`
            border 
            p-3 
            rounded-xl
            w-full 
            mb-4
            border
            outline-none
            transition-all
            duration-300
            ${
                darkMode
                    ? "bg-gray-900 border-gray-700 text-white placeholder-gray-500"
                    : "bg-white border-gray-300 text-black"
            }
        `}
        />
    )
}