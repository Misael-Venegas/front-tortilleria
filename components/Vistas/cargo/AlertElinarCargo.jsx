import React from 'react'
import { Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, gql } from '@apollo/client'

const DELETE_CARGO = gql`
      mutation deleteCargo($id_cargo: Int!, $key: Float!){
              deleteCargo(id_cargo: $id_cargo, key: $key)
      }
`

export const AlertElinarCargo = () => {
    const { confirm } = Modal
    const [eliminar_cargo, { loading }] = useMutation(DELETE_CARGO)
    const eliminarCargo = async (id_cargo, setActualizarTabla) => {
        try {
            await eliminar_cargo({
                variables: {
                    id_cargo,
                    key: Math.random()
                }
            })
            setActualizarTabla(Math.random())
            message.success("Cargo eliminado")
        } catch (error) {
            message.error(error.message)
        }
    }

    const alertEliminarCargo = (id_cargo, setActualizarTabla) => {
        confirm({
            title: "Estas seguro que deseas completar esta tarea",
            icon: <ExclamationCircleOutlined />,
            okText: "Si",
            cancelText: "No",
            okType: "danger",

            onOk() {
                eliminarCargo(id_cargo, setActualizarTabla)
            },
        })
    }

    return { alertEliminarCargo }
}

