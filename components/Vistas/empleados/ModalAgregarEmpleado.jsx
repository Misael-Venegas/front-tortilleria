import React from 'react'
import { Modal, Form, Button, Input } from 'antd'
const ModalAgregarEmpleado = ({ setOpenModalNuevoEmpleado, modalNuevoEmpleado }) => {
    const guardarEMpleado = (event) => {
        console.log(event)
    }
    return (
        <Modal
            destroyOnClose={true}
            title="Nuevo empleado"
            visible={modalNuevoEmpleado}
            onCancel={() => setOpenModalNuevoEmpleado(false)}
            width={800}
            footer={false}
            maskClosable={false}
            keyboard={false}
        >
            <Form
                name='formEmpleados'
                onFinish={guardarEMpleado}
                layout='vertical'
            >
                <div className='row' >
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Nombre(s)"
                            name="nombres"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Apellido paterno"
                            name="paterno"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div className='row' >
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Apellido materno"
                            name="materno"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Teléfono"
                            name="telefono"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div className='row' >
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Verificar email"
                            name="verificarEmail"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div className='row' >
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Dirección"
                            name="direccion"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Cargo"
                            name="cargo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div className='row' >
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Contraseña"
                            name="contrasenhia"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </div>
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Verificar contraseña"
                            name="verificarContrasenhia"
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </div>
                </div>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >Guardar</Button>
                        <Button className='float-right mr-2' onClick={() => setOpenModalNuevoEmpleado(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregarEmpleado