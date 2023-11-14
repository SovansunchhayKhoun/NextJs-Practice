import { useTodoContext } from '@/libs/TodoContext'
import React from 'react'

type Props = {
  todo: Todo
}

export default function DeleteButton({ todo }: Props) {
  const { handleDelete } = useTodoContext()
  return (
    <button onClick={() => {
      handleDelete(todo._id)
    }} className='px-2 py-1 border border-black'>
      Delete
    </button>
  )
}