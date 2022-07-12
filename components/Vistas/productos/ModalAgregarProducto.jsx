import React from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import { useMutation, gql } from '@apollo/client'

const CREATE_PRODUCTO = gql`
    mutation agregarProducto($nombreProducto: String!,  $key: Float!){
        agregarProducto(nombreProducto: $nombreProducto, key: $key)
    }
`

const ModalAgregarProducto = ({ verModalAgregarProductos, setVerModalAgregarProductos, setactuaizarTabla }) => {

    const [agregar_producto, { loading }] = useMutation(CREATE_PRODUCTO)

    const guardarProducto = async (event) => {
        console.log(event)
        try {
            await agregar_producto({
                variables: {
                    nombreProducto: event.nombre,
                    key: Math.random()
                }
            })
            message.success("Registro realizado")
            setactuaizarTabla(Math.random())
            setVerModalAgregarProductos(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            visible={verModalAgregarProductos}
            footer
            onCancel={() => setVerModalAgregarProductos(false)}
            maskClosable={false}
            keyboard={false}
            title="Nuevo producto"
            destroyOnClose={true}
        >
            <Form
                layout='vertical'
                name='FormProductos'
                onFinish={guardarProducto}
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
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right ml-1' >Guardar</Button>
                        <Button className='float-right' onClick={() => setVerModalAgregarProductos(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregarProducto