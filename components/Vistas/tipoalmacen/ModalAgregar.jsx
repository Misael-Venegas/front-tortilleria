import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Form, Button } from 'antd'

const CREATE_TIPO_ALMACEN = gql`
  mutation createAlmacenTipo($nombre: String!) {
    createAlmacenTipo(nombre: $nombre)
  }
`;

const ModalAgregar = ({ setVerModal, verModal, sqlGet }) => {
    const [formularioTipoAlmacen] = Form.useForm();
    const [crear_almacen, { loading }] = useMutation(CREATE_TIPO_ALMACEN, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });

    const guardarDatos = async (form) => {
        try {
            await crear_almacen({
                variables: {
                    nombre: form.nombre
                },
            });
            setVerModal(false)
            formularioTipoAlmacen.resetFields();
            message.success("Registro exitoso")
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Tipo Almacén"
            onCancel={() => setVerModal(false)}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                form={formularioTipoAlmacen}
                onFinish={guardarDatos}
            >
                <Form.Item label="Nombre"
                    name="nombre"
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido",
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >Guardar</Button>
                        <Button className='float-right mr-2' onClick={() => setVerModal(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregar