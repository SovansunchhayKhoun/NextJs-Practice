'use client'
import Link from 'next/link'
import React from 'react'

type Props = {
  todo: Todo
}

export default function TodoCard({ todo }: Props) {
  return (
    <Link className='flex gap-4' href={`/${todo.id}`} key={todo.id}>
      {todo.todo}
      
      <button>
        Delete
      </button>
    </Link>
  )
}