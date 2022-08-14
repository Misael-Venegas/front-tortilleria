import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Modal, message, Input, Form, Button } from 'antd';
import { useRouter } from 'next/router';
const UPDATE_PASSWORD = gql`
    mutation cambiarContrasenhia( $contrasenhia: String!, $key: Float!){
        cambiarContrasenhia( contrasenhia: $contrasenhia, key: $key)
    }
`


const ModalEnvarContrasenhia = ({ openModal, setOpenModal }) => {
    const router = useRouter()
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

                    contrasenhia: event.contrasenhia,
                    key: Math.random()
                }
            })
            setOpenModal(false)
            message.success("Contraseña actualizada")
            localStorage.removeItem('token')
            router.push('/')

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