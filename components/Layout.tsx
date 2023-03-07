import { ReactNode, VFC } from 'react'
import Head from 'next/head'
import Link from 'next/link'

interface Props {
  children: ReactNode
  title: string
}

export const Layout: ({ children, title = 'Welcome to Nextjs' } :Props) => {
  
}
