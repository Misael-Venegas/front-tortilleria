import React from 'react'
import { Modal, Form, Input, message, Button } from 'antd'
import { useMutation, gql } from '@apollo/client'


const CREATE_SUCURSAL = gql`
      mutation createSucursal($input: inputSucursal!){
        createSucursal(input: $input)
      }
`

const ModalAgregarSucursal = ({ verModalAgregarSucursal, setVerModalAgregarProductos, setactualizarTabla }) => {
    const [crearSuacursal] = useMutation(CREATE_SUCURSAL)
    const guardarSucursal = async (event) => {
        try {
            await crearSuacursal({
                variables: {
                    input: {
                        nombre: event.nombre,
                        telefono: event.telefono,
                        direccion: event.direccion
                    }
                }
            })
            message.success("Sucursal registrada")
            setVerModalAgregarProductos(false)
            setactualizarTabla(Math.random())
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            footer
            destroyOnClose={true}
            visible={verModalAgregarSucursal}
            onCancel={() => setVerModalAgregarProductos(false)}
            maskClosable={false}
            keyboard={false}
            title="Nueva Sucursal"
        >
            <Form
                name='FormSucursal'
                onFinish={guardarSucursal}
                layout="vertical"
            >
                <Form.Item
                    label="Nombre"
                    name='nombre'
                    rules={[{
                        required: true,
                        message: "Este campo es requerido"
                    }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Teléfono"
                    name="telefono"
                    rules={[{
                        required: true,
                        message: "Este campo es requerido"
                    }]}
                >
                    <Input maxLength={10} minLength={10} />
                </Form.Item>

                <Form.Item
                    label="Dirección"
                    name="direccion"
                    rules={[{
                        required: true,
                        message: "Este campo es requerido"
                    }]}
                >
                    <Input />
                </Form.Item>

                <div className='row' >
                    <div className='col-12' >
                        <Button className='float-right ml-1' type='primary' htmlType='submit' >Guardar</Button>
                        <Button className='float-right' onClick={() => setVerModalAgregarProductos(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregarSucursal