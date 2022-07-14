import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Table, Modal, message } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const DELETE_INSUMOS = gql`
    mutation deleteInsumo($id_insumos: Int!){
      deleteInsumo(id_insumos: $id_insumos)
    }
`

const TablaInsumos = ({ data, sqlGet, setDatosEditar, setVerModal }) => {
  const { confirm } = Modal;
  const [eliminar_insumos] = useMutation(DELETE_INSUMOS, {
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

  const editarDatos = (data) => {
    setDatosEditar(data);
    setVerModal(true);
  }

  const modalEliminar = (id, insumo) => {
    confirm({
      title: "¿Desea eliminar el registro seleccionado?",
      content: <><b><br />Insumo: </b>{insumo}</>,
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
      eliminar_insumos({
        variables: {
          id_insumos: idEliminar
        }
      })
      message.success("Registro eliminado")
    } catch (error) {
      message.error(error.message)
    }
  }

  const crearFila = (insumo, key) => {
    return {
      key: key + 1,
      descripcion: insumo.descripcion,
      unidad_medida: insumo.unidad_medida,
      tipo_almacen: insumo.tipo_almacen,
      acciones: <span>
        <span className='seleccionarComponente' style={{ color: "#40A9FF" }}> <EditOutlined onClick={() => editarDatos(insumo)} /> </span> &nbsp;
        <span className='seleccionarComponente' style={{ color: "red" }} > <DeleteOutlined onClick={() => modalEliminar(insumo.id_insumos, insumo.descripcion)} /></span>
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

export default TablaInsumos