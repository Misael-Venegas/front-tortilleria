import React from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, gql } from '@apollo/client'

const DELETE_PRODUCTO = gql`
    mutation deleteAlmacenProducto($id_producto: Int!){
             deleteAlmacenProducto(id_producto: $id_producto)
    }
`

export const AlertEliminarAlmacen = () => {
    const { confirm } = Modal;
    const [elimarProducto, { loading }] = useMutation(DELETE_PRODUCTO)

    const eliminarProducto = async (id_producto, setActualizarTabla) => {
        try {
            await elimarProducto({
                variables: {
                    id_producto
                }
            })
            setActualizarTabla(Math.random())
        } catch (error) {

        }
    }

    const alertEliminarAlmacen = (id_producto, setActualizarTabla) => {
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

    return { alertEliminarAlmacen }

}

