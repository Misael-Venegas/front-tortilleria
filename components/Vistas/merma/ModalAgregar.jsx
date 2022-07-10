import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select , InputNumber } from 'antd'

const ModalAgregar = ({ setVerModal, verModal }) => {
    const [cantidad, setCantidad] = useState("");
    const [tipoMerma, setTipoMerma] = useState("");
    const [sucursal, setSucursal] = useState("");

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
        setTipoMerma(value)
    };

    const handleChangeSucursal = (value) => {
        setSucursal(value)
    };

    const limpiarCampos = () => {
        setCantidad("");
        setSucursal("");
        setTipoMerma("");
    }
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nueva Merma"
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
                <Form.Item label="Tipo Merma">
                    <Select onChange={handleChange}>
                        <Select.Option value="1">Tortilla</Select.Option>
                        <Select.Option value="2">Masa</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Cantidad">
                    <InputNumber value={cantidad} onChange={(e) => setUnidad(e.target.value)}  style={{ width: '100%' }}/>
                </Form.Item>
                <Form.Item label="Sucursal">
                    <Select onChange={handleChangeSucursal}>
                        <Select.Option value="1">SUCURSAL 1</Select.Option>
                        <Select.Option value="2">SUCURSAL 2</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregar