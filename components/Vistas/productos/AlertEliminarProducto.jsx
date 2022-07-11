import React from 'react'
import { Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, gql } from '@apollo/client'

const DELETE_PRODUCT = gql`
  mutation eliminarProducto($id_producto: Int!){
           eliminarProducto(id_producto: $id_producto)
  }
`
export const AlertEliminarProducto = () => {
    const { confirm } = Modal
    const [eliminar_producto] = useMutation(DELETE_PRODUCT)

    const eliminarProducto = (id_producto, setActualizarTabla) => {
        try {
            eliminar_producto({
                variables: {
                    id_producto
                }
            })
            setActualizarTabla(Math.random())
            message.success("Registro eliminado")
        } catch (error) {
            message.error(error.message)
        }
    }
    const alertEliminarProducto = (id_producto, setActualizarTabla) => {
        confirm({
            title: "Estas seguro que deseas completar esta tarea",
            icon: <ExclamationCircleOutlined />,
            okText: "Si",
            cancelText: "No",
            okType: "danger",

            onOk() {
                eliminarProducto(id_producto, setActualizarTabla)
            },
        })
    }

    return { alertEliminarProducto }
}
