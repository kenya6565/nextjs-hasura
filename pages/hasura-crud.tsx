import { useState, FormEvent } from 'react'
import { useQuery, useMutation } from '@apollo/client'

// GraphQL Query
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../queries/queries'

// data type
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql'
import { Layout } from '../components/Layout'

const HasuraCRUD = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  })

  // get update_users_bu_pk as return value to execute update user
  // it is function
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER)

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

  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    // delete_users_by_pk is deleted user now
    update(cache, { data: { delete_users_by_pk } }) {
      cache.modify({
        // delete target user from existingUsers by filter
        fields: {
          // readField allows you to read any fields you select(id in this case)
          users(existingUsers, { readField }) {
            return existingUsers.filter(
              // leave user who does not match user's id which got deleted now
              (user) => delete_users_by_pk.id !== readField('id', user)
            )
          },
        },
      })
    },
  })

  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
    </Layout>
  )
}
