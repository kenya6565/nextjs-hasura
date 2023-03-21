import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from '../lib/apolloClient'

export default function App({ Component, pageProps }: AppProps) {
  const client = initializeApollo()
  return (
    // make it available to use apolloClient in every file
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
