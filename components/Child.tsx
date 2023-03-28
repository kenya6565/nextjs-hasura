import { ChangeEvent, FormEvent, memo, VFC } from 'react'

interface Props {
  printMsg: () => void
}

const Child = ({ printMsg }) => {
  return <div>Child</div>
}

export default Child
