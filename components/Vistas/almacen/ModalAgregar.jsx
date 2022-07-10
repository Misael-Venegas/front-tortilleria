import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select } from 'antd'

const ModalAgregar = ({ setVerModal, verModal }) => {
    const [tipo, setTipo] = useState("");
    const [unidad, setUnidad] = useState("");
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

    const handleChangeAlmacen = (value) => {
        setTipo(value)
    };

    const handleChangeSucursal = (value) => {
        setSucursal(value)
    };

    const limpiarCampos = () => {
        setTipo("");
        setUnidad("");
        setSucursal("");
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
                <Form.Item label="Insumo">
                    <Select defaultValue={"1"}>
                        <Select.Option value="1">Maíz</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Cantidad">
                    <Input value={unidad} onChange={(e) => setUnidad(e.target.value)} />
                </Form.Item>
                <Form.Item label="Tipo Almacen">
                    <Select onChange={handleChangeAlmacen}>
                        <Select.Option value="1">Utilitarios</Select.Option>
                        <Select.Option value="2">Refaccion</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Sucursal">
                    <Select onChange={handleChangeSucursal}>
                        <Select.Option value="1">Norte</Select.Option>
                        <Select.Option value="2">Sur</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregar