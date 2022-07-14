import React, { useEffect, useState } from 'react'
import { message, Modal, Table } from 'antd'
import { useMutation, gql } from '@apollo/client'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const DELETE_PROVEEDOR = gql`
    mutation deleteProveedor($id_proveedor: Int!){
        deleteProveedor(id_proveedor: $id_proveedor)
    }
`

const TablaProveedores = ({data, sqlGetProveedores, setProvedorDatos, setVerModalEditar}) => {

  const [eliminar_proveedor] = useMutation(DELETE_PROVEEDOR, {
    refetchQueries: [
      {query: sqlGetProveedores},
    ],
  });
  const [id_proveedor, setId_proveedor] = useState(null);
  const [email, setEmail] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const columns = [{
    title: "#",
    dataIndex: "key",
    name: "key",
  },
  {
    title: "Nombre Proveedor",
    dataIndex: "nombre",
    name: "nombre"
  },
  {
    title: "Correo",
    dataIndex: "correo",
    name: "correo"
  },
  {
    title: "Teléfono",
    dataIndex: "telefono",
    name: "telefono"
  },
  {
    title: "Acciones",
    dataIndex: "acciones",
    name: "acciones"
  }
  ]

  const modalEliminar = (id, email) => {
    setModalVisible(true);
    setId_proveedor(id);
    setEmail(email);
  }

  const eliminarRegistro = () => {
    try {
      eliminar_proveedor({
        variables: {
          id_proveedor
        }
      })
      setModalVisible(false);
      message.success("Registro eliminado")
    } catch (error) {
      message.error(error.message)
    }
  }

  const crearFila = (proveedor, key) => {
    return {
      key: key + 1,
      nombre: proveedor.nombre,
      correo: proveedor.correo,
      telefono: proveedor.telefono,
      acciones: <span>
        <span className='seleccionarComponente' style={{ color: "red" }} > <DeleteOutlined onClick={() => modalEliminar(proveedor.id_proveedor, proveedor.correo)} /></span> &nbsp;
        <span className='seleccionarComponente' style={{ color: "#40A9FF" }}> <EditOutlined onClick={()=>{setVerModalEditar(true); setProvedorDatos(proveedor)}}/> </span>
      </span>
    }
  }

  return (
    <div>
      <Table className='pt-5' columns={columns}
        dataSource={
          data ? data.map((proveedor, key) => {
            return crearFila(proveedor, key)
          }) : []
        }
      >
      </Table>
      <Modal
        destroyOnClose={true}
        visible={modalVisible}
        title="Eliminar Proveedor"
        keyboard={false}
        maskClosable={false}
        cancelText="Cancelar"
        okText="Eliminar"
        onCancel={() => setModalVisible(false)}
        onOk={eliminarRegistro}
      >
        <div className='row align-items-center'>
          <span>¿Desea eliminar el proveedor seleccionado?</span>
          <p></p>
          <p>{email}</p>
        </div>
      </Modal>
    </div>
  )
}

export default TablaProveedores