import React from 'react'
import { Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, gql } from '@apollo/client'

const DELETE_USER = gql`
  mutation eliminarUsuario($id_empleado: Int!){
           eliminarUsuario(id_empleado: $id_empleado)
  }
`

export const AlertEliminarEmpleado = () => {

    const [eliminar_usuario] = useMutation(DELETE_USER)
    const { confirm } = Modal

    const eliminarEmpleado = async (id_empleado, setActualizarTabla) => {
        try {
            await eliminar_usuario({
                variables: {
                    id_empleado
                }
            })
            setActualizarTabla(Math.random())
            message.success("Registro eliminado")
        } catch (error) {
            message.error(error.message)
        }
    }
    const alertEliminarEmpleado = (id_empleado, setActualizarTabla) => {
        confirm({
            title: "Estas seguro que deseas completar esta tarea",
            icon: <ExclamationCircleOutlined />,
            okText: "Si",
            cancelText: "No",
            okType: "danger",

            onOk() {
                eliminarEmpleado(id_empleado, setActualizarTabla)
            },
        })
    }

    return { alertEliminarEmpleado }
}
