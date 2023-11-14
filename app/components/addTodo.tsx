'use client'

import React from 'react'
import TodoList from './todoList'
import { useTodoContext } from '@/libs/TodoContext'

type Props = {

}

export default function AddTodo({ }: Props) {
  const { todoInput, submitTodo, errors, setTodoInput, handleEdit, activeTodo, setActiveTodo, setErrors } = useTodoContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setTodoInput(value)
  }

  const handleCancelEdit = () => {
    setErrors([])
    setActiveTodo({
      _id: "",
      todo: ""
    })
    setTodoInput("")
  }

  return (
    <div className='flex flex-col gap-2'>
      <input
        value={todoInput}
        onChange={handleChange}
        onKeyDown={({ key }) => {
          if (key === 'Enter') activeTodo._id ? handleEdit(activeTodo) : submitTodo()
        }} className='border border-black p-2' placeholder='Add new todo' type="text" />
      {activeTodo._id ? (
        <div className='flex justify-center gap-2 w-full'>
          <button
            onClick={() => {
              handleEdit(activeTodo)
            }}
            className='border border-black px-2 py-1'>
            Edit
          </button>
          <button onClick={handleCancelEdit} className='border border-black  px-2 py-1'>
            Cancel
          </button>

        </div>
      ) : (
        <button
          onClick={() => submitTodo()}
          className='border border-black px-2 py-1'>
          Submit
        </button>
      )}

      {errors?.map((err, key: number) => (
        <div key={key}>
          {err.message}
        </div>
      ))}
      <TodoList />
    </div>
  )
}