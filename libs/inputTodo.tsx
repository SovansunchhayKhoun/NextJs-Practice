'use client'
import React, { useState } from 'react'


export default function useInputTodo() {
  const [todoInput, setTodoInput] = useState<Todo>({
    todo: ""
  })
  return {
    todoInput,
    setTodoInput
  }
}