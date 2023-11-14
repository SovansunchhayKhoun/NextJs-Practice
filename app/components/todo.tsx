'use client'
import useTodo from '@/libs/useTodo'
import React, { useEffect, useState } from 'react'
import TodoCard from './todoCard'
import useInputTodo from '@/libs/inputTodo'

type Props = {
}

export default function TodoList({ }: Props) {
  const { todoInput, setTodoInput } = useInputTodo()
  const { data: todos, isLoading } = useTodo()
  const [myTodos, setMyTodos] = useState([])
  useEffect(() => {
    setMyTodos(todos)
  }, [todos])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== '') {
      return setMyTodos(todos.filter((todo: Todo) => todo.todo.toLowerCase().includes(e.target.value.toLowerCase())))
    }
    return setMyTodos(todos)
  }
  if (isLoading) {
    return (
      <h1>Loading</h1>
    )
  }
  return (
    <div className='flex flex-col gap-2'>
      <input onChange={handleChange} placeholder='Search...' className='border border-black p-2' type="text" />
      <div className='flex flex-col h-64 overflow-auto gap-2'>
        {myTodos?.map((todo: Todo) => {
          return (
            <TodoCard key={todo.id} todo={todo} />
          )
        })}
      </div>
    </div>
  )
}
