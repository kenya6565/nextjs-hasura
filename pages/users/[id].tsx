import Link from 'next/link'
import { GetStaticProps, GetStaticPaths } from 'next'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'
import { initializeApollo } from '../../lib/apolloClient'
import { GET_USERIDS, GET_USERBY_ID } from '../../queries/queries'
import {
  GetUserByIdQuery,
  GetUserIdsQuery,
  Users,
} from '../../types/generated/graphql'
import { Layout } from '../../components/Layout'

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo()
  // get user list using graphql query
  const { data } = await apolloClient.query<GetUserIdsQuery>({
    query: GET_USERIDS,
  })
  // get user id and put it into params
  const paths = data.users.map((user) => ({
    params: {
      id: user.id,
    },
  }))
  return {
    paths,
    // expand unique page dynamically
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUserByIdQuery>({
    // get user data which matches params of user id
    query: GET_USERBY_ID,
    variables: { id: params.id },
  })
  return {
    props: {
      // this users_by_pk matches query GET_USERBY_ID
      user: data.users_by_pk,
    },
    // make ISR valid
    revalidate: 1,
  }
}
