import React, { useEffect, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Table, Tag } from 'antd'

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
        let fecha = new Date();
        return {
            key: key + 1,
            producto: salidas.nombreProducto,
            cantidad: salidas.cantidad,
            sucursal: salidas.noSucursal,
            fecha: fecha < new Date(salidas.Fecha) ? <Tag color='error' > Salida programada para el {invertirFecha(salidas.Fecha)} </Tag> : <Tag color='cyan' > {salidas.Fecha} </Tag>
        }
    }

    const invertirFecha = (fecha) => {
        const cadena = fecha.split('-')
        return cadena[2] + "-" + cadena[1] + "-" + cadena[0]
    }

    return (
        <><br />
            <Table columns={colums} className='mt-1' loading={loading} dataSource={arraySalidas ? arraySalidas.map((salida, key) => {
                return crearFila(salida, key)
            }) : []} />

            <table id='tablaSalidas' hidden >
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Fecha salida</th>
                        <th>Sucursal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        arraySalidas.map((salida, key) => {
                            let fecha = new Date();
                            return (
                                <tr key={key} >
                                    <td> {salida.nombreProducto} </td>
                                    <td>{salida.cantidad}</td>
                                    <td> {salida.noSucursal} </td>
                                    <td>
                                        {
                                            fecha < new Date(salida.Fecha) ? <Tag color='error' > Salida programada para el {invertirFecha(salida.Fecha)} </Tag> : <Tag color='cyan' > {salida.Fecha} </Tag>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default TableSalidas