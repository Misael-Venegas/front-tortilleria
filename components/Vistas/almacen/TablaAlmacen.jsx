import React from 'react'
import { useMutation, gql } from '@apollo/client';
import { Table, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const DELETE_ALMACEN = gql`
  mutation deleteAlmacenProducto($id_almacen: Int!) {
    deleteAlmacenProducto(id_almacen: $id_almacen)
  }
`;

const TablaAlmacen= ({ data, sqlGet, setDatosEditar, setVerModal }) => {
      const [eliminar_producto] = useMutation(DELETE_ALMACEN, {
        refetchQueries: [
          { query: sqlGet },
        ],
      });
  
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

      const editarDatos = (data) => {
        setDatosEditar(data);
        setVerModal(true);
      }
    
      const modalEliminar = (id, insumo) => {
        Modal.confirm({
          title: "Mensaje de Confirmación",
          content: <><b><br />¿Desea eliminar el producto Seleccionado?</b><br />{insumo}</>,
          icon: <ExclamationCircleOutlined />,
          okText: "Si",
          cancelText: "No",
          okType: "danger",
          onOk() {
           eliminarInsumos(id)
          },
        })
      }

      const eliminarInsumos = (idEliminar) => {
        try {
          eliminar_producto({
            variables: {
              id_almacen: idEliminar
            }
          })
          message.success("Registro eliminado")
        } catch (error) {
          message.error(error.message)
        }
      }

      const crearFila = (almacen, key) => {
        return {
          key: key + 1,
          insumo: almacen.nombreInsumo,
          cantidad: almacen.cantidad,
          tipo_almacen: almacen.nombreTipoAlmacen,
          sucursal: almacen.nombreSucursal,
          acciones: <span>
            <span className='seleccionarComponente' style={{ color: "#40A9FF" }}> <EditOutlined onClick={() => editarDatos(almacen)} /> </span> &nbsp;
            <span className='seleccionarComponente' style={{ color: "red" }} > <DeleteOutlined onClick={() => modalEliminar(almacen.id_almacen, almacen.nombreInsumo)} /></span>
          </span>
        }
      }

      return (
        <div>
          <Table className='pt-5' columns={columns} 
           dataSource={
            data ? data.map((insumo, key) => {
              return crearFila(insumo, key)
            }) : []
          }
          >
          </Table>
        </div>
      )
    }
    
export default TablaAlmacen