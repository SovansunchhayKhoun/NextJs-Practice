'use client'
import useTodo from '@/libs/useTodo'

import React, { useState } from 'react'
import TodoList from './todo'
import useInputTodo from '@/libs/inputTodo'

type Props = {

}

export default function AddTodo({ }: Props) {
  // const [todoInput, setTodoInput] = useState<Todo>({ todo: "" })
  const { todoInput, setTodoInput } = useInputTodo();
  const { data, mutate } = useTodo()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTodoInput({ todo: value })
  }
  const submitTodo = async () => {
    await fetch("http://localhost:3000/api/todos", {
      method: "POST",
      body: JSON.stringify(todoInput),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    mutate([...data, todoInput])
    setTodoInput({ todo: "" })
  }
  return (
    <div className='flex flex-col gap-2'>
      <input value={todoInput.todo} onChange={handleChange} onKeyDown={({ key }) => { if (key === 'Enter') submitTodo() }} className='border border-black p-2' placeholder='Add new todo' type="text" />
      <button onClick={() => submitTodo()} className='border border-black px-2 py-1'>Submit</button>
      <TodoList />
    </div>
  )
}