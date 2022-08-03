import React, { useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Table } from 'antd'

const OBTENER_SALIDAS = gql`
    query getSalidas($fecha: String!){
        getSalidas(fecha: $fecha){
            id_salida
            Fecha
            descripcion
            id_salidas_almacen
            id_almacen
            cantidad
            nombre
        }
    }
`

const colums = [
    {
        title: "#",
        dataIndex: "key",
        name: "key"
    }, {
        title: "Producto",
        dataIndex: "producto",
        name: "producto"
    }, 
    {
        title: "Cantidad",
        dataIndex: "cantidad",
        name: "cantidad"
    }, 
    {
        title: "Descripción",
        dataIndex: "descripcion",
        name: "descripcion"
    },
]

const TableSalidas = ({ fecha , nuevaSalida}) => {
    const [verSalidas, { data,loading }] = useLazyQuery(OBTENER_SALIDAS)

    useEffect(() => {
        try {
            verSalidas({
                variables: {
                    fecha: fecha
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }, [fecha, nuevaSalida])
    
    const crearFila = (salidas, key) => {
        return {
            key: key + 1,
            producto: salidas.nombre,
            cantidad: salidas.cantidad,
            descripcion: salidas.descripcion
        }
    }

    return (
        <Table columns={colums} className='pt-4' dataSource={data && data.getSalidas && data.getSalidas.map((salida, key) => {
            return (
                crearFila(salida, key)
            )
        })} />
    )
}

export default TableSalidas