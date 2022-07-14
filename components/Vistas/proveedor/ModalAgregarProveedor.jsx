import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Modal, Input, message, Form, Button } from "antd";

const CREATE_PROVEEDOR = gql`
  mutation createProveedor($input: proveedorInput!) {
    createProveedor(input: $input)
  }
`;

const ModalAgregarProveedor = ({ setVerModal, verModal, sqlGetProveedores }) => {

    const [formularioProveedor] = Form.useForm();
    const [crear_proveedor, { loading }] = useMutation(CREATE_PROVEEDOR, {
        refetchQueries: [
          {query: sqlGetProveedores},
        ],
      });

    const guardarProveedor = async (form) => {
        try {
            await crear_proveedor({
                variables: {
                    input: {
                        nombre: form.nombre,
                        correo: form.email,
                        telefono: form.telefono,
                    },
                },
            });
            setVerModal(false);
            formularioProveedor.resetFields();
            message.success("Registro exitoso");
        } catch (error) {
            message.error(error.message);
        }
    };


    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Proveedor"
            onCancel={() => setVerModal(false)}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form form={formularioProveedor} layout="vertical" onFinish={guardarProveedor}>
                <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido",
                        },
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    label="Teléfono"
                    name="telefono"
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido",
                        },
                    ]}
                >
                    <Input maxLength={10} minLength={10} />
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >Guardar</Button>
                        <Button className='float-right mr-2' onClick={() => setVerModal(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalAgregarProveedor;
