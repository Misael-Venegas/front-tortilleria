import React, { useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Table } from 'antd'

const CREATE_CORTE = gql`
        query generarCorteDeCaja($fechaCorte: String! ){
              generarCorteDeCaja(fechaCorte: $fechaCorte){
                id_ventas_productos
                nombre_sucursal
                nombre_producto
                cantidad
                total
                empleado
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
    }, {
        title: "Cantidad",
        dataIndex: "cantidad",
        name: "cantidad"
    }, {
        title: "Total",
        dataIndex: "precio",
        name: "precio"
    }, 
]

const TableSalidas = ({ fecha }) => {
    const [generarCorteDeCaja, { data,loading }] = useLazyQuery(CREATE_CORTE)

    useEffect(() => {
        try {
            generarCorteDeCaja({
                variables: {
                    fechaCorte: fecha
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }, [ fecha])
    
    const crearFila = (venta, key) => {
        return {
            key: key + 1,
            producto: venta.nombre_producto,
            cantidad: venta.cantidad + "kg",
            precio: venta.total,
        }
    }

    return (
        <Table columns={colums} className='pt-4' dataSource={data ? data.generarCorteDeCaja.map((salida, key) => {
            return (
                crearFila(salida, key)
            )
        }) : []} />
    )
}

export default TableSalidas