import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from 'react'
import Login from "../components/login/Login";

const HOLA_MUNDO = gql`
 query holaMundo {
  holaMundo
 }
`

export default function Home() {

  const [holaMundo, { data, loading, error }] = useLazyQuery(HOLA_MUNDO);

  useEffect(() => {
    holaMundo()
  }, [])

  console.log(data)
  return (
    <>
      <Login />
    </>
  )
}
