import Link from 'next/link'
import { GET_USERS } from '../queries/queries'
import { GetUsersQuery } from '../types/generated/graphql'
import { Layout } from '../components/Layout'
import { GetServerSideProps } from 'next'
import { initializeApollo } from '../lib/apolloClient'

const FetchSub = () => {}

export default FetchSub
