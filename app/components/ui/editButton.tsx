import { useTodoContext } from '@/libs/TodoContext'
import React from 'react'

type Props = {
  todo: Todo,
}

export default function EditButton({ todo }: Props) {
  const { setTodoInput, setActiveTodo } = useTodoContext()
  return (
    <button onClick={() => {
      setTodoInput(todo.todo)
      setActiveTodo(todo)
    }} className='px-2 py-1 border border-black'>
      Edit
    </button>
  )
}