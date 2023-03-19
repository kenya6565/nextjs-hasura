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
import { UserItem } from '../components/UserItem'

const HasuraCRUD = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' })
  const { data, loading, error } = useQuery<GetUsersQuery>(GET_USERS, {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // editing user mode when editedUser.id exists
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        })
        // infer type of err when executing catch()
      } catch (err: any) {
        alert(err.message)
      }
      // when completing updating user, undo edited user
      setEditedUser({ id: '', name: '' })

      // creating new user mode when editedUser.id does not exist
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        })
      } catch (err: any) {
        alert(err.message)
      }
      setEditedUser({ id: '', name: '' })
    }
  }
  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>
  return (
    <Layout title="Hasura CRUD">
      <p className="mb-3 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New user ?"
          type="text"
          value={editedUser.name}
          onChange={(e) =>
            // every time putting user name in text area, renew user name by setEditedUser
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>

      {data?.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            user={user}
            setEditedUser={setEditedUser}
            delete_users_by_pk={delete_users_by_pk}
          />
        )
      })}
    </Layout>
  )
}
export default HasuraCRUD
