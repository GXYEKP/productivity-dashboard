import { useState, useEffect } from "react";
import type { Task } from "../types/task";

export const useTasks = () => {

    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem("tasks")
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem("tasks", JSON.stringify(tasks))
        } catch {
            console.warn("Failed to save tasks to localStorage")
        }
    }, [tasks])

    const addTask = (text : string) => {
        setTasks(prev => [...prev, {
            id : Date.now(), 
            title : text,
            completed : false}])
    }

    const toggleTask = (id : number) => {
        setTasks(prev => prev.map(t => t.id === id ? {
            ...t, completed : ! t.completed
        } : t))
    }

    const deleteTask = (id : number) => {
        setTasks(prev => prev.filter(t => t.id !== id))
    }

    return { tasks, addTask, toggleTask, deleteTask}
}