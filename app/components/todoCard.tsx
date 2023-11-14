'use client'
import useInputTodo from '@/libs/inputTodo'
import useTodo from '@/libs/useTodo'
import React, { useState } from 'react'

type Props = {
  todo: Todo,
}

export default function TodoCard({ todo }: Props) {
  const [hover, setHover] = useState<boolean>(false)
  const { data: todos, mutate } = useTodo()
  const { setTodoInput } = useInputTodo()

  const handleEdit = async (id: string | undefined) => {
    console.log(todo.todo)
    setTodoInput({ todo: todo.todo })
    console.log(id)
  }

  const handleDelete = async (id: string | undefined) => {
    await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: "DELETE"
    }).then(res => console.log(res))
    mutate([...todos])
  }
  return (
    <div onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)} className='flex gap-4 border border-black items-center justify-between p-2 cursor-pointer' key={todo.id}>
      <div>
        {todo.todo}
      </div>
      {hover && (
        <div className='flex gap-2'>
          <button onClick={() => {
            handleEdit(todo.id)
          }} className='px-2 py-1 border border-black'>
            Edit
          </button>
          <button onClick={() => {
            handleDelete(todo?.id)
          }} className='px-2 py-1 border border-black'>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}