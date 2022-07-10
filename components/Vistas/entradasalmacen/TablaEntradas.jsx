import React from 'react'
import { Table } from 'antd'

const TablaInsumos= () => {
    const columns = [{
        title: "#",
        dataIndex: "key",
        name: "key",
      },
      {
        title: "Descripción",
        dataIndex: "descripcion",
        name: "descripcion"
      },
      {
        title: "Unidad Medida",
        dataIndex: "unidad_medida",
        name: "unidad_medida"
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
    
export default TablaInsumos