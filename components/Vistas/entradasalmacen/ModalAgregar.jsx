import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select, InputNumber, DatePicker } from 'antd'
import moment from 'moment';

const ModalAgregar = ({ setVerModal, verModal }) => {
    const [cantidad, setCantidad] = useState("");
    const [producto, setProducto] = useState("");
    const [proveedor, setProveedor] = useState("");
    const [fecha, setFecha] = useState("");

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
        setProveedor(value)
    };

    const handleChangeFecha = (value) => {
        setFecha(value)
    };

    const limpiarCampos = () => {
        setCantidad("");
        setFecha("");
        setProducto("");
        setProveedor("");
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
                <Form.Item label="Producto">
                    <Input value={producto} onChange={(e) => setProducto(e.target.value)} />
                </Form.Item>
                <Form.Item label="Cantidad">
                    <InputNumber value={cantidad} onChange={(e) => setCantidad(e.target.value)} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Proveedor">
                    <Select onChange={handleChange}>
                        <Select.Option value="1">Prov1</Select.Option>
                        <Select.Option value="2">Prov2</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Fecha">
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                        onChange={handleChangeFecha}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregar