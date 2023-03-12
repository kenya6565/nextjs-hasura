import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import 'cross-fetch/polyfill'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

// undefined when apolloClient is not created
let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () => {
  return new ApolloClient({
    // when SSR
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'https://hasura-training-ken.hasura.app/v1/graphql',
    }),

    cache: new InMemoryCache(),
  })
}

export const initializeApollo = (initialState = null) => {
  // execute when apolloClient is null || undefined
  const _apolloClient = apolloClient ?? createApolloClient()

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}
