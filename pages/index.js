import Login from "../components/login/Login";
import { useMutation, gql } from '@apollo/client'
import { Spin } from "antd";
import { useEffect } from "react";
const CREATE_ADMIN = gql`
    mutation registrarPrimerAdmin {
        registrarPrimerAdmin
    }
`


export default function Home() {

  const [crearAdmin] = useMutation(CREATE_ADMIN)

  useEffect(() => {
    try {
      crearAdmin()
    } catch (error) {
      console.log(error.message)
    }
  }, [])



  return (
    <>
      <Login />
    </>
  )
}
