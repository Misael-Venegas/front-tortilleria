import React from 'react'
import { message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useMutation, gql } from "@apollo/client"

const DELETE_SUCURSAL = gql`
    mutation deleteSucursal($id_sucursal: Int!){
        deleteSucursal(id_sucursal: $id_sucursal)
    }
`

export const AlertElinarSucursal = () => {

    const [eliminar_sucursa, { loading }] = useMutation(DELETE_SUCURSAL)
    const { confirm } = Modal

    const eliminarSucursal = async (id_sucursal, setActualizarTabla) => {
        try {
            await eliminar_sucursa({
                variables: {
                    id_sucursal
                }
            })
            setActualizarTabla(Math.random())
            message.success("Sucursal eliminada")
        } catch (error) {
            message.error(error.message)
        }
    }

    const alertEliminarSucursal = (id_sucursal, setActualizarTabla) => {
        confirm({
            title: "Estas seguro que deseas completar esta tarea",
            icon: <ExclamationCircleOutlined />,
            okText: "Si",
            cancelText: "No",
            okType: "danger",

            onOk() {
                eliminarSucursal(id_sucursal, setActualizarTabla)
            },
        })
    }

    return { alertEliminarSucursal }

}
