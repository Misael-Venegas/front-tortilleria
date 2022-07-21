import React from 'react'
import { Table } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'


const TablaInsumos= ({ data, sqlGet, setDatosEditar, setVerModal}) => {
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
        title: "Fecha",
        dataIndex: "fecha",
        name: "fecha"
      },
      {
        title: "Proveedor",
        dataIndex: "proveedor",
        name: "proveedor"
      }
      ]
    
      const editarDatos = (data) => {
        setDatosEditar(data);
        setVerModal(true);
      }

      const crearFila = (entrada, key) => {
        return {
          key: key + 1,
          producto: entrada.descripcion,
          cantidad: entrada.cantidad,
          fecha: entrada.fecha,
          proveedor: entrada.nombre,
          
        }
      }

      /**
       * acciones: <span>
            <span className='seleccionarComponente' style={{ color: "#40A9FF" }}> <EditOutlined onClick={() => editarDatos(entrada)} /> </span> &nbsp;
            <span className='seleccionarComponente' style={{ color: "red" }} > <DeleteOutlined onClick={() => {}} /></span> 
            </span>
       */

      return (
        <div>
          <Table className='pt-5' columns={columns} 
           dataSource={
            data ? data.map((entrada, key) => {
              return crearFila(entrada, key)
            }) : []
          }
          >
          </Table>
        </div>
      )
    }
    
export default TablaInsumos