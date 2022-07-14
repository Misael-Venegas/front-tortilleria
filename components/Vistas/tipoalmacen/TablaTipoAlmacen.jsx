import React, { useState }from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal, Table, message } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const DELETE_ALMACEN = gql`
    mutation deleteAlmacenTipo($id_tipo_almacen: Int!){
      deleteAlmacenTipo(id_tipo_almacen: $id_tipo_almacen)
    }
`

const TablaTipoAlmacen = ({ data, sqlGet }) => {
  const [eliminar_almacen] = useMutation(DELETE_ALMACEN, {
    refetchQueries: [
      {query: sqlGet},
    ],
  });
  const [id_almacen, setId_almacen] = useState(null);
  const [almacen, setAlmacen] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const modalEliminar = (id, nombre) => {
    setModalVisible(true);
    setId_almacen(id);
    setAlmacen(nombre);
  }

  const eliminarRegistro = () => {
    try {
      eliminar_almacen({
        variables: {
          id_tipo_almacen: id_almacen
        }
      })
      setModalVisible(false);
      message.success("Registro eliminado")
    } catch (error) {
      message.error(error.message)
    }
  }

  const crearFila = (almacen, key) => {
    return {
      key: key + 1,
      tipo_almacen: almacen.nombre,
      acciones: <span>
        <span className='seleccionarComponente' style={{ color: "red" }} > <DeleteOutlined onClick={() => modalEliminar(almacen.id_tipo_almacen, almacen.nombre)} /></span> &nbsp;
      </span>
    }
  }

  return (
    <div>
      <Table className='pt-5' columns={columns}
        dataSource={
          data ? data.map((almacen, key) => {
            return crearFila(almacen, key)
          }) : []
        }
      >
      </Table>
      <Modal
        destroyOnClose={true}
        visible={modalVisible}
        title="Eliminar Tipo Almacen"
        keyboard={false}
        maskClosable={false}
        cancelText="Cancelar"
        okText="Eliminar"
        onCancel={() => setModalVisible(false)}
        onOk={eliminarRegistro}
      >
        <div className='row align-items-center'>
          <span>¿Desea eliminar el tipo de Almacen seleccionado?</span>
          <p></p>
          <p>{almacen}</p>
        </div>
      </Modal>
    </div>
  )
}

export default TablaTipoAlmacen