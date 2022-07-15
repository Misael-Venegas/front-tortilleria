import React, {useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Modal, Input, message, Form, Button } from "antd";

const UPDATE_PROVEEDOR = gql`
  mutation updateProveedor($input: proveedorUpdate!) {
    updateProveedor(input: $input)
  }
`;

const ModalEditarProveedor = ({ data, sqlGetProveedores, verModalEditar, setVerModalEditar }) => {

    const [formularioProveedor] = Form.useForm();
    const [editar_proveedor, { loading }] = useMutation(UPDATE_PROVEEDOR, {
        refetchQueries: [
            { query: sqlGetProveedores },
        ],
    });

    const actualizarProveedor = async (form) => {
        try {
            await editar_proveedor({
                variables: {
                    input: {
                        id_proveedor: data.id_proveedor,
                        nombre: form.nombre,
                        correo: form.email,
                        telefono: form.telefono,
                    },
                },
            });
            setVerModalEditar(false);
            formularioProveedor.resetFields();
            message.success("Registro exitoso");
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        if (data) {
            formularioProveedor.setFieldsValue({
                nombre: data.nombre,
                email: data.correo,
                telefono: data.telefono,
            })
        }
    }, [data])

    return (
        <Modal
            destroyOnClose={true}
            visible={verModalEditar}
            title="Nuevo Proveedor"
            onCancel={() => setVerModalEditar(false)}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form form={formularioProveedor} layout="vertical" onFinish={actualizarProveedor}>
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
                        <Button type='primary' htmlType='submit' className='float-right'>Actualizar</Button>
                        <Button className='float-right mr-2' onClick={() => setVerModalEditar(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};

export default ModalEditarProveedor;
