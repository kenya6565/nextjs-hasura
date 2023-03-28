import React from 'react'
import { useCreateForm } from '../hooks/useCreateForm'

const CreateUser = () => {
  // get return value of useCreateForm
  const {
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    text,
    handleTextChange,
  } = useCreateForm()
}

export default CreateUser
