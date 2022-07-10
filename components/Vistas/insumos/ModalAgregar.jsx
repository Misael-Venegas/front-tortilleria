import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select } from 'antd'

const ModalAgregar = ({ setVerModal, verModal }) => {
    const [descripcion, setDescripcion] = useState("");
    const [unidad, setUnidad] = useState("");
    const [tipo, setTipo] = useState("");

    const guardarDatos = async () => {
        try {
            message.success("Registro exitoso")
            limpiarCampos();
            setVerModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    const handleChange = (value) => {
        setTipo(value)
    };

    const limpiarCampos = () => {
        setDescripcion("");
        setUnidad("");
        setTipo("");
    }
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Insumo"
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
                <Form.Item label="Descripción">
                    <Input value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                </Form.Item>
                <Form.Item label="Unidad Medida">
                    <Input value={unidad} onChange={(e) => setUnidad(e.target.value)} />
                </Form.Item>
                <Form.Item label="Tipo Almacen">
                    <Select onChange={handleChange}>
                        <Select.Option value="1">Utilitarios</Select.Option>
                        <Select.Option value="2">Lucy</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregar