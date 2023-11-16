import { useTodoContext } from '@/libs/TodoContext'
import React from 'react'

type Props = {
  todo: Todo
}

export default function DeleteButton({ todo }: Props) {
  const { handleDelete, loading } = useTodoContext()
  return (
    <button aria-disabled={loading} onClick={() => {
      handleDelete(todo._id)
    }} className='px-2 py-1 border border-black'>
      {loading ? 'Loading...' : 'Delete'}
    </button>
  )
}