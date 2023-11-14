'use client'
import useTodo from '@/libs/useTodo'
import React, { useEffect, useState } from 'react'
import TodoCard from './todoCard'

type Props = {

}

export default function TodoList({ }: Props) {
  const { data: todos, isLoading, mutate } = useTodo()
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
    <div className='flex flex-col'>
      <input onChange={handleChange} placeholder='Search...' className='border border-black p-2' type="text" />
      <div className='grid grid-cols-2'>
        {myTodos?.map((todo: Todo) => {
          return (
            <TodoCard key={todo.id} todo={todo} />
          )
        })}
      </div>
    </div>
  )
}
