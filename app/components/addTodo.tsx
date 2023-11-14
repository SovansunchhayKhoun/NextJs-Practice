'use client'
import useTodo from '@/libs/useTodo'

import React, { useState } from 'react'

type Props = {

}

export default function AddTodo({ }: Props) {
  const [todo, setTodo] = useState<Todo>({ todo: "" })
  const { data, mutate } = useTodo()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTodo({ todo: value })
  }
  const submitTodo = async () => {
    await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    mutate([...data, todo])
    setTodo({ todo: "" })
  }
  return (
    <div className='flex gap-2'>
      <input value={todo.todo} onChange={handleChange} onKeyDown={({ key }) => { if (key === 'Enter') submitTodo() }} className='border border-black p-2' placeholder='Add new todo' type="text" />
      <button onClick={() => submitTodo()} className='border border-black px-2 py-1'>Submit</button>
    </div>
  )
}