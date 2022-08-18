import React from 'react'
import { useMutation, gql } from '@apollo/client';
import { Table, Modal, message } from 'antd'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const DELETE_MERMA = gql`
  mutation deleteMerma($id_merma: Int!) {
    deleteMerma(id_merma: $id_merma)
  }
`;

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
    title: "Fecha",
    dataIndex: "fecha_registro",
    name: "fecha_registro"
  },
  {
    title: "Acciones",
    dataIndex: "acciones",
    name: "acciones"
  }
  ]

  const modalEliminar = (id, insumo) => {
    Modal.confirm({
      title: "Mensaje de Confirmación",
      content: <><b><br />¿Desea eliminar la merma seleccionada?</b><br />{insumo}</>,
      icon: <ExclamationCircleOutlined />,
      okText: "Si",
      cancelText: "No",
      okType: "danger",
      onOk() {
        try {
          eliminar_merma({
            variables: {
              id_almacen: id
            }
          })
          message.success("Registro eliminado")
        } catch (error) {
          message.error(error.message)
        }
      },
    })
  }


  const crearFila = (merma, key) => {
    return {
      key: key + 1,
      cantidad: merma.cantidad,
      tipo_merma: merma.tipo_merma,
      sucursal: merma.sucursal,
      acciones: <span>
        <span className='seleccionarComponente' style={{ color: "red" }} > <DeleteOutlined onClick={() => modalEliminar(merma.id_merma, merma.tipo_merma)} /></span>
      </span>,
      fecha_registro: merma.fecha_registro
    }
  }

  return (
    <div>
      <Table className='pt-5' columns={columns} dataSource={
        data ? data.map((merma, key) => {
          return crearFila(merma, key)
        }) : []
      }>
      </Table>
    </div>
  )
}

export default TablaMermas