// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import ToDoList from './ToDoList'

const Todo = () => {
  const inputRef = useRef()
  const [todoList, setTodoList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')): [])

  const add = () => {
    const inputText = inputRef.current.value.trim()

    if(inputText === ''){
      return null
    }
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    }
    setTodoList((prev)=> [...prev, newTodo])
    inputRef.current.value = ''
  }

  const deleteTodo = (id) => {
    setTodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id)
    })
  }

  const toggle = (id) =>{
    setTodoList((prevTodo)=>{
      return prevTodo.map((todo) => {
        if(todo.id === id){
          return {...todo, isComplete: !todo.isComplete}
        }
        return todo
      })
    })
  }

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todoList))
  },[todoList])

  return (
    <div className='bg-white place-self-center p-7 w-11/12 max-w-md flex flex-col min-h-[550px] rounded-xl'>
        <div className='flex items-center gap-2 mt-7'>
            <img className='w-8' src={todo_icon} alt="" />
            <h2 className='text-3xl font-semibold'>To-Do List</h2>
        </div>
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14
            pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add Your Task' />
            <button onClick={add}
            className='border-none bg-orange-600 rounded-full h-14 w-32 text-white text-lg font-medium
            cursor-pointer'
            >ADD +</button>
        </div>

        {
          todoList.map((item,index)=> (
            <ToDoList
             key={index} text={item.text} id={item.id}
            isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
          ))
        }
    </div>
  )
}

export default Todo
