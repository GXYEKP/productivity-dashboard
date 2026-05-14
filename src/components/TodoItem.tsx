import type { Task } from "../types/task"
import { useTheme } from "../hooks/useTheme";

type Props = {
    task : Task
    toggleTask : (id : number) => void
    deleteTask : (id : number) => void
}

export default function TodoItem({
    task,
    toggleTask,
    deleteTask
}: Props) {

    const {darkMode} = useTheme()
    
    return (
        <div className={`
            flex 
            justify-between 
            items-center 
            p-4 
            rounded-xl 
            shadow-sm
            transition-all
            duration-300
            hover:scale-[1.01]
            border
            ${
                darkMode
                    ? "bg-gray-900 border-gray-800"
                    : "bg-white border-gray-200"
            }
        `}>

            <div className="flex gap-2">

                <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    />
                
                <p className={`
                    transition-all
                    ${
                        task.completed
                            ? "line-through"
                            : ""
                    }
                    `}>
                    {task.title}
                </p>
            </div>

            <button 
                onClick={() => deleteTask(task.id)}
                className="
                    text-red-500
                    hover:text-red-700
                    transition-all
                "
            >
                Delete
            </button>
        </div>
    )
}