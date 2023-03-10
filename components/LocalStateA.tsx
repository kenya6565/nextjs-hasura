import React from 'react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { todoVar } from '../cache'
import { useReactiveVar } from '@apollo/client'
import Link from 'next/link'

const LocalStateA = () => {
  const [input, setInput] = useState('')

  // refer to current value of todoVar defined in cache.ts
  const todos = useReactiveVar(todoVar)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // prevent button from not being reloaded by default
    e.preventDefault()

    // add user input to todoVar
    todoVar([...todoVar(), { title: input }])
    setInput('')
  }

  return (
    <>
      <p className="mb-3 font-bold">makeVar</p>
      {todos?.map((task, index) => {
        ;<p className="mb-3 y-1" key={index}>
          {task.title}
        </p>
      })}
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="mb-3 px-3 border border-gray-300"
          placeholder="New task ?"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        {/* disabled when no input */}
        <button
          disabled={!input}
          className="disabled:opacity-40 mb-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          type="submit"
        >
          Add new state
        </button>
      </form>
      <Link href="/local-state-b">
        <a>Next</a>
      </Link>
    </>
  )
}

export default LocalStateA
