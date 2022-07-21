import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal, Table, message } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const DELETE_MERMA = gql`
    mutation deleteMermaTipo($id_tipo_merma: Int!){
      deleteMermaTipo(id_tipo_merma: $id_tipo_merma)
    }
`

const TablaMermas = ({ data, sqlGet }) => {

  const [eliminar_merma] = useMutation(DELETE_MERMA, {
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

  const modalEliminar = (id, merma) => {
    Modal.confirm({
      title: "Mensaje de Confirmación",
      content: <><b><br />¿Desea eliminar el tipo de merma seleccionada?</b><br />{merma}</>,
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
      eliminar_merma({
        variables: {
          id_tipo_merma: idEliminar
        }
      })
      message.success("Registro eliminado")
    } catch (error) {
      message.error(error.message)
    }
  }

  const crearFila = (merma, key) => {
    return {
      key: key + 1,
      tipo_mermas: merma.tipo,
      acciones: <span>
        <span className='seleccionarComponente' style={{ color: "red" }} > <DeleteOutlined onClick={() => modalEliminar(merma.id_tipo_merma, merma.tipo)} /></span> &nbsp;
      </span>
    }
  }

  return (
    <div>
      <Table className='pt-5' columns={columns} 
       dataSource={
        data ? data.map((merma, key) => {
          return crearFila(merma, key)
        }) : []
      }>

      </Table>
    </div>
  )
}

export default TablaMermas