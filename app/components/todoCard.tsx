'use client'
import React, { useState } from 'react'
import EditButton from './ui/editButton'
import DeleteButton from './ui/deleteButton'
import { useTodoContext } from '@/libs/TodoContext'

type Props = {
  todo: Todo,
}

export default function TodoCard({ todo }: Props) {
  const [hover, setHover] = useState<boolean>(false)
  const { handleEdit, handleComplete } = useTodoContext()
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className='flex gap-4 border border-black items-center justify-between p-2 cursor-pointer'>
      <div>
        {todo.isCompleted ? <span className='line-through'>{todo.todo}</span> : <span>{todo.todo}</span>}
      </div>
      <div className={`${hover ? 'opacity-1' : 'opacity-0'} flex gap-2 transition duration-200`}>
        <EditButton todo={todo} />
        <DeleteButton todo={todo} />
        <button onClick={() => handleComplete(todo)} className={`${todo.isCompleted ? 'bg-green-400' : 'bg-red-400'}`}>
          {todo.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
        </button>
      </div>
    </div>
  )
}