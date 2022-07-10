import React from 'react'
import { Table } from 'antd'

const TablaTipoAlmacen = () => {
    const columns = [{
        title: "#",
        dataIndex: "key",
        name: "key",
      },
      {
        title: "Tipo de Almacén",
        dataIndex: "tipo_almacen",
        name: "tipo_almacen"
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
    
export default TablaTipoAlmacen