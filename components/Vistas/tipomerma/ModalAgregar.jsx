import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select , InputNumber } from 'antd'

const ModalAgregar = ({ setVerModal, verModal }) => {
    const [tipoMerma, setTipoMerma] = useState("");

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
        setTipoMerma("");
    }
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Tipo de Merma"
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
                <Form.Item label="Tipo de Merma">
                    <Input value={tipoMerma} onChange={(e) => setTipoMerma(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregar