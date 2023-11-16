'use client'
import React, { createContext, useContext, useState } from 'react'
import useTodo from './useTodo'

type Props = {
  children: React.ReactNode
}

type TodoContext = {
  errors: TodoError[] | [],
  setErrors: React.Dispatch<React.SetStateAction<TodoError[] | []>>
  submitTodo: () => Promise<void>,
  todoInput: string,
  setTodoInput: React.Dispatch<React.SetStateAction<string>>,
  handleEdit: (todo: Todo) => Promise<void>,
  handleDelete: (id: string | undefined) => Promise<void>,
  handleComplete: (todo: Todo) => Promise<void>,
  activeTodo: Todo,
  setActiveTodo: React.Dispatch<React.SetStateAction<Todo>>,
  loading: boolean,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const StateContext = createContext<TodoContext | null>(null)

export default function TodoContext({ children }: Props) {
  const { data: todos, mutate } = useTodo()
  const [errors, setErrors] = useState<TodoError[]>([])
  const [todoInput, setTodoInput] = useState<string>("");
  const [activeTodo, setActiveTodo] = useState<Todo>({
    todo: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  const handleEdit = async (todo: Todo) => {
    setLoading(true)
    await fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      body: JSON.stringify({ todo: todoInput.trim() }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      console.log(res)
      setErrors(res.errors)
      mutate([...todos])
    }).catch(err => console.log(err))
    setLoading(false)
  }

  const handleComplete = async (todo: Todo) => {
    const { data: findTodo }: { data: Todo } = await fetch(`/api/todos/${todo._id}`).then(res => res.json())
    setLoading(true)
    await fetch(`/api/todos/${todo._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        isCompleted: !findTodo.isCompleted
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(_res => mutate([...todos])).catch(err => console.log(err))
    setLoading(false)
  }

  const submitTodo = async () => {
    setErrors([])
    setLoading(true)
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({
        todo: todoInput
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()).then(res => {
      console.log(res)
      if (res.errors) return setErrors(res.errors)
      mutate([res, ...todos])
      setTodoInput("")
    }).catch(err => {
      console.log(err)
    })
    setLoading(false)
  }

  const handleDelete = async (id: string | undefined) => {
    setLoading(true)
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE"
    }).then(res => {
      mutate([...todos])
      console.log(res)
    })
    setLoading(false)
  }

  return (
    <StateContext.Provider value={{
      handleComplete,
      errors,
      setErrors,
      todoInput,
      setTodoInput,
      submitTodo,
      handleEdit,
      handleDelete,
      activeTodo,
      setActiveTodo,
      setLoading,
      loading
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useTodoContext = () => {
  const context = useContext(StateContext)
  if (!context) throw new Error("useTodoContext cannot be used outside of TodoContextProvider")
  return context;
}