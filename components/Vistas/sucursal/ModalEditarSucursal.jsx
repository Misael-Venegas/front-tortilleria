import React from 'react'
import { Modal, Form, Button, Input, message } from 'antd'
import { useMutation, gql } from '@apollo/client'

const EDIT_SUCURSAL = gql`
      mutation editSucursal($input: inputSucursal!, $id_sucursal: Int!) {
        editSucursal(input: $input, id_sucursal: $id_sucursal)
      }
`

const ModalEditarSucursal = ({ verModalEditarSucursal, setVerModalEditarSucursal, sucursal, setActualizarTabla }) => {

    const [guardarCambiosSucursal] = useMutation(EDIT_SUCURSAL)

    const guardarCambios = async (event) => {
        try {
            await guardarCambiosSucursal({
                variables: {
                    input: {
                        nombre: event.nombre,
                        telefono: event.telefono,
                        direccion: event.direccion
                    },
                    id_sucursal: sucursal.id_sucursal
                }
            })
            message.success("Sucursal actualizada")
            setActualizarTabla(Math.random())
            setVerModalEditarSucursal(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            title="Editar sucursal"
            footer={false}
            maskClosable={false}
            keyboard={false}
            visible={verModalEditarSucursal}
            onCancel={() => setVerModalEditarSucursal(false)}
        >

            <Form
                name='FormSucursal'
                onFinish={guardarCambios}
                layout="vertical"
            >
                <Form.Item
                    label="Nombre"
                    name='nombre'
                    initialValue={sucursal ? sucursal.nombre : ""}
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
                    initialValue={sucursal ? sucursal.telefono : ""}
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
                    initialValue={sucursal ? sucursal.direccion : ""}
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
                        <Button className='float-right' onClick={() => setVerModalEditarSucursal(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>

        </Modal>
    )
}

export default ModalEditarSucursal