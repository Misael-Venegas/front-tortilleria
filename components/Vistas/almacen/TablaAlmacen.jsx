import React from 'react'
import { Table } from 'antd'

const TablaAlmacen= () => {
    const columns = [{
        title: "#",
        dataIndex: "key",
        name: "key",
      },
      {
        title: "Insumo",
        dataIndex: "insumo",
        name: "insumo"
      },
      {
        title: "Cantidad",
        dataIndex: "cantidad",
        name: "cantidad"
      },
      {
        title: "Tipo de Almacén",
        dataIndex: "tipo_almacen",
        name: "tipo_almacen"
      },
      {
        title: "Sucursal",
        dataIndex: "sucursal",
        name: "sucursal"
      },
      {
        title: "Acciones",
        dataIndex: "acciones",
        name: "acciones"
      }
      ]
    
      return (
        <div>
          <Table className='pt-5' columns={columns} >
    
          </Table>
        </div>
      )
    }
    
export default TablaAlmacen