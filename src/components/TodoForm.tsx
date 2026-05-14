import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

type Props = {
    addTask : (text : string) => void
}

export default function TodoForm ({addTask} : Props) {

    const {darkMode} = useTheme()

    const [text, setText] = useState("")

    const handleSubmit = (
        e : React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        if (!text.trim()) return
        addTask(text.trim())
        setText("")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2"
        >
            <input 
            type="text"
            placeholder="Add task..." 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`
                border
                p-3
                rounded-xl
                w-full
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

            <button className="
                px-5
                rounded-xl
                bg-blue-500
                text-white
                hover:bg-blue-600
                transition-all
                "
            >
                Add
            </button>
        </form>
    )
}