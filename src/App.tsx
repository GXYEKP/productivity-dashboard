import { useState } from 'react';
import  TodoForm  from "./components/TodoForm";
import  TodoItem  from "./components/TodoItem";
import  SearchBar  from "./components/SearchBar";
import  WeatherWidget  from "./components/WratherWidget";
import { useTasks } from './hooks/useTask';
import { useTheme } from "./hooks/useTheme";

export default function App() {

  const {tasks, addTask, toggleTask, deleteTask} = useTasks()
  const [search, setSearch] = useState<string>("")
  const {darkMode, toggleTheme} = useTheme()

  const filtered = tasks.filter(t => 
    t.title
      .toLowerCase()
      .includes(search.toLowerCase()
    )
  )

  return (
    <div className={`min-h-screen
    transition-all
    duration-300
    px-4
    py-10
    ${
      darkMode
        ? "bg-gray-950 text-gray-100"
        : "bg-gray-100 text-gray-900"
  }`}>

      <div className='max-w-2xl mx-auto'>

        <div className='mb-8'>
          <h1 className='text-5xl font-bold mb-2'>
            Productivity Dashboard
          </h1>

          <p className={darkMode ? "text-gray-400" : "text-gray-500"}>
            Manage your daily tasks efficiently
          </p>
        </div>

        <button 
          onClick={toggleTheme}
          className={`mb-6 
            px-4 
            py-2 
            rounded-xl f
            ont-medium 
            transition-all 
            duration-300 
            hover:scale-105
            ${
              darkMode
                ? "bg-yellow-400 text-black"
                : "bg-gray-900 text-white"
            }
          `}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

        <WeatherWidget/>

        <SearchBar value={search} onChange={setSearch}/>

        <TodoForm addTask={addTask}></TodoForm>

        <div className='mt-6 space-y-4'>

          {filtered.length === 0 ? (
            <p className={`text-center py-8 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              {search ? "No tasks match your search" : "No tasks yet - add one above!"}
            </p>
          ) : (

            filtered.map(task => (
              <TodoItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))
          )}

        </div>
      </div>
    </div>
  )
}
