import { Modal, Input, Form, Button, message } from 'antd'
import React from 'react'
import { useMutation, gql } from '@apollo/client'

const ENVIAR_CORREO = gql`
      mutation generarContrasenhiaTemporal($correo: String!){
        generarContrasenhiaTemporal(correo: $correo)
      }
`

const ModalContrasenhiaTemporal = ({ openModal, setOpenModal }) => {
    const [sendMail, { loading }] = useMutation(ENVIAR_CORREO)
    const enviarCorreo = async (event) => {
        console.log(event)
        try {
            await sendMail({
                variables: {
                    correo: event.email
                }
            })
            message.success("Se envió una contraseña temporal a tu correo electrónico")
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
                layout='vertical'
                onFinish={enviarCorreo}
            >
                <Form.Item
                    label="e-mail"
                    name="email"
                    rules={[{
                        required: true,
                        message: "Este campo es requerido"
                    }]}
                >
                    <Input type='email' />
                </Form.Item>
                <Button htmlType='submit' type='primary' >Enviar</Button>
            </Form>
        </Modal>
    )
}

export default ModalContrasenhiaTemporal