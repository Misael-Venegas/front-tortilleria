import React, { useEffect, useState } from 'react'
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { Table, Modal, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { AlertEliminarAlmacen } from './AlertEliminarAlmacen';
const GET_ALMACEN = gql`
      query getAlmacen($key: Float!) {
        getAlmacen(key: $key){
            id_almacen
            cantidadTotal
            nombreProducto
            unidad_de_medida
          }
      }
`

const TablaAlmacen = ({ setActualizarTabla, actualizarTabla }) => {

  const { alertEliminarAlmacen } = AlertEliminarAlmacen()

  const columns = [{
    title: "#",
    dataIndex: "key",
    name: "key",
  },
  {
    title: "Producto",
    dataIndex: "insumo",
    name: "insumo"
  },
  {
    title: "Cantidad",
    dataIndex: "cantidad",
    name: "cantidad"
  },
  {
    title: "Acciones",
    dataIndex: "acciones",
    name: "acciones"
  }
  ]
  const [arrayAlmacen, setarrayAlmacen] = useState([])
  const [obtnerAlmacen, { loading: loadingCargarProductos }] = useLazyQuery(GET_ALMACEN, {
    onCompleted: (data) => {
      data ? (data.getAlmacen ? setarrayAlmacen(data.getAlmacen) : setarrayAlmacen([])) : setarrayAlmacen([])
    }
  }
  )
  console.log(actualizarTabla)
  useEffect(() => {
    obtnerAlmacen({
      variables: {
        key: Math.random()
      }
    })
  }, [actualizarTabla])


  const crearFilas = (key, almacen) => {
    return {
      key: key + 1,
      insumo: almacen.nombreProducto,
      cantidad: almacen.cantidadTotal + " " + almacen.unidad_de_medida,
      acciones: <span style={{ color: "red" }} className="seleccionarComponente" onClick={() => alertEliminarAlmacen(almacen.id_almacen, setActualizarTabla)}  > <DeleteOutlined />  </span>
    }
  }

  return (
    <div>
      <Table className='pt-3' columns={columns} dataSource={arrayAlmacen ? arrayAlmacen.map((alm, key) => {
        return crearFilas(key, alm)
      }) : []} loading={loadingCargarProductos} >
      </Table>
    </div>
  )
}

export default TablaAlmacen