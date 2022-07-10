import React from 'react'
import { Table } from 'antd'

const TablaMermas= () => {
    const columns = [{
        title: "#",
        dataIndex: "key",
        name: "key",
      },
      {
        title: "Cantidad",
        dataIndex: "cantidad",
        name: "cantidad"
      },
      {
        title: "Tipo de Merma",
        dataIndex: "tipo_merma",
        name: "tipo_merma"
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
    
export default TablaMermas