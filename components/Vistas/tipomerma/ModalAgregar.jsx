import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select , InputNumber, Button } from 'antd'

const CREATE_TIPO_MERMA = gql`
  mutation createMermaTipo($tipo: String!) {
    createMermaTipo(tipo: $tipo)
  }
`;

const ModalAgregar = ({ setVerModal, verModal,sqlGet }) => {
    const [formulario] = Form.useForm();
    const [crear_merma, { loading }] = useMutation(CREATE_TIPO_MERMA, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });

    const guardarDatos = async (form) => {
        try {
            await crear_merma({
                variables: {
                    tipo: form.tipo
                },
            });
            setVerModal(false)
            formulario.resetFields();
            message.success("Registro exitoso")
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Tipo de Merma"
            onCancel={() => {setVerModal(false); formulario.resetFields();}}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                form={formulario}
                onFinish={guardarDatos}
            >
                <Form.Item label="Tipo de Merma" name="tipo"
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido",
                        },
                    ]}>
                    <Input/>
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >Guardar</Button>
                        <Button className='float-right mr-2' onClick={() => {setVerModal(false); formulario.resetFields();}} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregar