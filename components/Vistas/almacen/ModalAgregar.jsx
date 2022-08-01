import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select, Button, InputNumber } from 'antd'

const CREATE_PRODUCTO = gql`
        mutation createAlmacenProducto($producto: String!, $unidadMedida: String!){
            createAlmacenProducto(producto: $producto, unidadMedida: $unidadMedida)
}`

const ModalAgregar = ({ setVerModal, verModal, setActualizarTabla }) => {
    const [crearProducto, { loading }] = useMutation(CREATE_PRODUCTO)
    const guardarDatos = async (event) => {
        try {
            await crearProducto({
                variables: {
                    producto: event.nombre,
                    unidadMedida: event.unidadMedida
                }
            })
            message.success("Producto registrado")
            setActualizarTabla(Math.random())
            setVerModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose
            visible={verModal}
            title={"Nuevo Insumo Almacen"}
            onCancel={() => { setVerModal(false) }}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                onFinish={guardarDatos}
            >
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[{
                        required: true,
                        message: "Este campo es requerido"
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Unidad de medida"
                    name="unidadMedida"
                    rules={[{
                        required: true,
                        message: "Este campo es requerido"
                    }]}
                >
                    <Input />
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button htmlType='submit' className='float-right' type='primary' >Guardar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregar