import Link from 'next/link'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { useQuery } from '@apollo/client'

const FetchMain = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // store latest data as cache by accessing graphql(server side), every time executing useQuery
    // effective if you often change data in serverside or you want latest data real time
    // fetchPolicy: 'network-only',

    // similar to net-only
    // the same that store latest data as cache by accessing graphql(server side), every time executing useQuery
    // but, it displays the existing data first and then displays updated data when getting prepared
    fetchPolicy: 'cache-and-network',

    // default when none is set
    // always read it when there is data you got as cache
    // you should avoid it if you often change data in server side
    // fetchPolicy: 'cache-first',

    // it doesn't create any cache
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
