import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form } from 'antd'

const ModalAgregar = ({ setVerModal, verModal }) => {
    const [nombre, setNombre] = useState("");

    const guardarDatos = async () => {
        try {
            message.success("Registro exitoso")
            limpiarCampos();
            setVerModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    const limpiarCampos = () => {
        setNombre("");
    }
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Tipo Almacén"
            onCancel={() => { limpiarCampos(); setVerModal(false) }}
            cancelText="Cancelar"
            okText="Guardar"
            onOk={guardarDatos}
            keyboard={false}
            maskClosable={false}
        >
            <Form
                layout='vertical'
            >
                <Form.Item label="Nombre">
                    <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregar