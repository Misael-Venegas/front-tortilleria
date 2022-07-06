import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin } from 'antd'

const CREATE_CARGO = gql`
     mutation createCargo($nombreCargo: String!, $key: Float!){
              createCargo(nombreCargo: $nombreCargo, key: $key)
     }
`

const ModalAgregarCargo = ({ setVerModal, verModal, setActualizarTabla }) => {

    const [cargo, setcargo] = useState("")
    const [guardar_cargo, { loading }] = useMutation(CREATE_CARGO)

    const guardarCargo = async () => {
        try {
            await guardar_cargo({
                variables: {
                    nombreCargo: cargo,
                    key: Math.random()
                }
            })
            message.success("Registro exitoso")
            setActualizarTabla(Math.random())
            setVerModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo cargo"
            onCancel={() => setVerModal(false)}
            cancelText="Cancelar"
            okText="Guardar"
            onOk={guardarCargo}
            keyboard={false}
            maskClosable={false}
        >
            <Spin spinning={loading} tip="Por favor espere...">
                <span>Nombre</span>
                <Input onChange={(e) => setcargo(e.target.value)} value={cargo} />
            </Spin>
        </Modal>
    )
}

export default ModalAgregarCargo