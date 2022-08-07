import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { useLazyQuery, gql } from '@apollo/client'

const GET_ENTRADAS = gql`
      query getEntradas($fecha: String!) {
        getEntradas(fecha: $fecha) {
              id_entrada
              cantidad
              fechaRegistro
              nombreProducto
              noProveedor
              noTipoAlmacen
        }
      }
`

const TablaEntradas = ({ fecha, actualizarTabla }) => {
  const [arrayEntradas, setarrayEntradas] = useState([])
  const [obtnerEntradas, { loading }] = useLazyQuery(GET_ENTRADAS, {
    onCompleted: data => {
      data ? (data.getEntradas ? setarrayEntradas(data.getEntradas) : setarrayEntradas([])) : setarrayEntradas([])
    }
  })
  console.log(fecha)
  useEffect(() => {
    obtnerEntradas({
      variables: {
        fecha
      }
    })
  }, [fecha, actualizarTabla])

  const columns = [{
    title: "#",
    dataIndex: "key",
    name: "key",
  },
  {
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
    title: "Proveedor",
    dataIndex: "proveedor",
    name: "proveedor"
  },
  {
    title: "Tipo almacen",
    dataIndex: "tipoAlmacen",
    name: "tipoAlmacen"
  },
  {
    title: "Fecha",
    dataIndex: "fecha",
    name: "fecha"
  }
  ]



  const crearFila = (entrada, key) => {
    return {
      key: key + 1,
      producto: entrada.nombreProducto,
      cantidad: entrada.cantidad,
      fecha: entrada.fechaRegistro,
      proveedor: entrada.noProveedor,
      tipoAlmacen: entrada.noTipoAlmacen
    }
  }



  return (
    <div>
      <Table className='pt-3' columns={columns} dataSource={
        arrayEntradas ? arrayEntradas.map((entrada, key) => {
          return crearFila(entrada, key)
        }) : []
      }
        loading={loading}
      >
      </Table>
      <table id='tablaEntradas' hidden >
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Proveedor</th>
            <th>Tipo almacén</th>
            <th>Fecha entrada</th>
          </tr>
        </thead>
        <tbody>
          {
            arrayEntradas.map((entrada, key) => {
              return (
                <tr key={key} >
                  <td> {entrada.nombreProducto} </td>
                  <td> {entrada.cantidad} </td>
                  <td> {entrada.noProveedor} </td>
                  <td> {entrada.noTipoAlmacen} </td>
                  <td> {entrada.fechaRegistro} </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default TablaEntradas