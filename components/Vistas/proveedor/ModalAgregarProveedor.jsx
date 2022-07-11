import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form } from 'antd'

const CREATE_PROVEEDOR = gql`
     mutation createProveedor($input: proveedorInput!){
        createProveedor(input: $input)
     }
    `

const ModalAgregarProveedor = ({ setVerModal, verModal }) => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [crear_proveedor, { loading }] = useMutation(CREATE_PROVEEDOR)



    const guardarProveedor = async () => {
        console.log(nombre, email, telefono)
        try {
            await crear_proveedor({
                variables: {
                    input: {
                        nombre: nombre,
                        correo: email,
                        telefono: telefono,
                    }
                }
            })
            message.success("Registro exitoso")
            limpiarCampos();
            setVerModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    const limpiarCampos = () => {
        setNombre("");
        setEmail("");
        setTelefono("");
    }
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Proveedor"
            onCancel={() => { limpiarCampos(); setVerModal(false) }}
            cancelText="Cancelar"
            okText="Guardar"
            onOk={guardarProveedor}
            keyboard={false}
            maskClosable={false}
        >
            <Form
                layout='vertical'
            >
                <Form.Item label="Nombre">
                    <Input value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </Form.Item>
                <Form.Item label="E-mail">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
                </Form.Item>
                <Form.Item label="Teléfono">
                    <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} maxLength={10} minLength={10} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregarProveedor