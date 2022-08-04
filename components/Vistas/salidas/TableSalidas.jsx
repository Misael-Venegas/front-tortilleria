import React, { useEffect, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Table } from 'antd'

const OBTENER_SALIDAS = gql`
    query getAllSalidas($fecha: String!){
        getAllSalidas(fecha: $fecha){
            id_salida
            cantidad
            Fecha
            nombreProducto
            unidad_de_medida
            noSucursal
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
        title: "Fecha",
        dataIndex: "fecha",
        name: "fecha"
    }, {
        title: "Sucursal",
        dataIndex: "sucursal",
        name: "sucursal"
    }
]

const TableSalidas = ({ fecha, nuevaSalida }) => {
    const [arraySalidas, setarraySalidas] = useState([])
    const [obtner_salidas, { loading }] = useLazyQuery(OBTENER_SALIDAS, {
        onCompleted: (data) => {
            data ? (data.getAllSalidas ? setarraySalidas(data.getAllSalidas) : setarraySalidas([])) : setarraySalidas([])
        }
    })

    useEffect(() => {
        obtner_salidas({
            variables: {
                fecha
            }
        })
    }, [fecha, nuevaSalida])



    const crearFila = (salidas, key) => {
        return {
            key: key + 1,
            producto: salidas.nombreProducto,
            cantidad: salidas.cantidad,
            sucursal: salidas.noSucursal,
            fecha: salidas.Fecha
        }
    }

    return (
        <Table columns={colums} className='pt-4' loading={loading} dataSource={arraySalidas ? arraySalidas.map((salida, key) => {
            return crearFila(salida, key)
        }) : []} />
    )
}

export default TableSalidas