import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../queries/queries'
import { CreateUserMutation } from '../types/generated/graphql'

export const useCreateForm = () => {
  const [text, setText] = useState('')
  const [username, setUsername] = useState('')
  // create and delete are needed to update cache by yourself
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    // process to deal with cache
    // insert_users_one is created user now
    update(cache, { data: { insert_users_one } }) {
      // get created user's id by cache.identify
      const cacheId = cache.identify(insert_users_one)
      // update field by cache.modify
      cache.modify({
        // select which fields you want to update
        fields: {
          // get current data of user by existingUsers as array
          users(existingUsers, { toReference }) {
            // refer to data of created user by toReference(cacheId)
            // unfold current data of user by spread syntax and add created user at the top
            return [toReference(cacheId), ...existingUsers]
          },
        },
      })
    },
  })
  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }, [])
  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }, [])
  const printMsg = () => {
    console.log('Hello')
  }
}
