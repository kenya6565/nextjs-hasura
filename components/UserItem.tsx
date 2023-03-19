import { memo, Dispatch, SetStateAction } from 'react'
import { Users, DeleteUserMutationFn } from '../types/generated/graphql'

interface Props {
  user: {
    __typename?: 'users'
    // select type id, name, created_at by PICK
  } & Pick<Users, 'id' | 'name' | 'created_at'>
  delete_users_by_pk: DeleteUserMutationFn
  setEditedUser: Dispatch<
    SetStateAction<{
      id: string
      name: string
    }>
  >
}
export default function UserItem({
  user,
  delete_users_by_pk,
  setEditedUser,
}: Props) {
  return (
    <div className="my-1">
      <p className="mr-2">{user.name}</p>
      <p className="mr-2">{user.created_at}</p>
    </div>
  )
}
