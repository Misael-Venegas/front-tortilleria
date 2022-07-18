import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal, message, Input, Form, Button } from 'antd';

const UPDATE_PASSWORD = gql`
    mutation cambiarContrasenhia($email: String!, $contrasenhia: String!, $key: Float!){
        cambiarContrasenhia(email: $email, contrasenhia: $contrasenhia, key: $key)
    }
`


const ModalEnvarContrasenhia = ({ openModal, setOpenModal }) => {

    const [actualizarContrasenhia, { loading }] = useMutation(UPDATE_PASSWORD)

    const actualizarContrase = async (event) => {
        console.log(event)
        if (event.contrasenhia !== event.confirmarContrasenhia) {
            message.error("Los campos contraseña y confirmar contraseña no coiciden")
            return
        }
        try {
            await actualizarContrasenhia({
                variables: {
                    email: event.email,
                    contrasenhia: event.contrasenhia,
                    key: Math.random()
                }
            })
            message.success("Contraseña actualizada")
            setOpenModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }
    return (
        <Modal
            onCancel={() => setOpenModal(false)}
            visible={openModal}
            title="Cambiar contraseña"
            destroyOnClose
            footer={false}
        >

            <Form
                name='formActualizarContraseña'
                onFinish={actualizarContrase}
                layout='vertical'
            >
                <Form.Item
                    label="email"
                    name="email"
                    rules={[
                        { required: true, message: "Este campo es requerido" }
                    ]}
                >
                    <Input type='email' />
                </Form.Item>
                <Form.Item
                    label="Contraseña"
                    name="contrasenhia"
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirmar contraseña"
                    name="confirmarContrasenhia"
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button htmlType='submit' type='primary' className='float-right ml-1'  >Actualizar</Button>
                        <Button className='float-right' onClick={() => setOpenModal(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalEnvarContrasenhia