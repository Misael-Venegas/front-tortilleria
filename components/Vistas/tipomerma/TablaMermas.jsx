import React from 'react'
import { Table } from 'antd'

const TablaMermas= () => {
    const columns = [{
        title: "#",
        dataIndex: "key",
        name: "key",
      },
      {
        title: "Tipo de Merma",
        dataIndex: "tipo_mermas",
        name: "tipo_mermas"
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