import Link from 'next/link'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { useQuery } from '@apollo/client'

const FetchMain = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // store latest data as cache by accessing graphql, every time executing useQuery
    fetchPolicy: 'network-only',
    // fetchPolicy: 'cache-and-network',
    //fetchPolicy: 'cache-first',

    // default when none is set
    //fetchPolicy: 'no-cache',
  })
  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    )
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>

      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        )
      })}
      <Link href="/hasura-sub">
        <a className="mt-6">Next</a>
      </Link>
    </Layout>
  )
}
export default FetchMain
