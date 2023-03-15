import Link from 'next/link'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../lib/apolloClient'

const client = initializeApollo()

export const getServerSideProps: GetServerSideProps<
  GetUsersQuery
> = async () => {
  const { data } = await client.query({
    query: GET_USERS,
  })

  return {
    props: {
      ...data,
    },
  }
}

const FetchMain = ({ users }: GetUsersQuery) => {
  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>

      {users.map((user) => {
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
