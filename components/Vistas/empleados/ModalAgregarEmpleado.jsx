import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Input, Select, message } from 'antd'
import { gql, useLazyQuery, useMutation } from '@apollo/client';

const GET_ALL_CARGOS = gql`
    query getAllCargos($key: Float!) {
          getAllCargos(key: $key){
            id_cargo
            nombre_cargo
          }
    }
`

const CREATE_USUARIO = gql`
      mutation createusuario($input: usuarioInput!, $key: Float!){
        createusuario(input: $input, key: $key)
      }
`

const ModalAgregarEmpleado = ({ setOpenModalNuevoEmpleado, modalNuevoEmpleado, setActualizarTabla }) => {

    const { Option } = Select;
    const [arrayCargos, setarrayCargos] = useState([])
    const [obtenerCargos, { loading }] = useLazyQuery(GET_ALL_CARGOS, {
        onCompleted: (data) => {
            data ? (data.getAllCargos ? setarrayCargos(data.getAllCargos) : setarrayCargos([])) : setarrayCargos([])
        }
    })

    const [crearUsuario, { loading: loadingCrearUsuario }] = useMutation(CREATE_USUARIO)

    const guardarEMpleado = async (event) => {
        if (event.verificarEmail !== event.email) {
            message.error("los campos emai y verificar email no coinsiden")
            return
        }
        try {
            await crearUsuario({
                variables: {
                    input: {
                        nombre: event.nombres,
                        apellidoP: event.paterno,
                        apellidoM: event.materno,
                        telefono: event.telefono,
                        email: event.email,
                        password: event.contrasenhia,
                        cargo: event.cargo,
                        direccion: event.direccion
                    },
                    key: Math.random()
                }
            })
            message.success("Se registró un nuevo usuario")
            setActualizarTabla(Math.random())
            setOpenModalNuevoEmpleado(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        obtenerCargos({
            variables: {
                key: Math.random()
            }
        })
    }, [])


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
                            <Select style={{ width: "100%" }} loading={loading} >
                                {
                                    arrayCargos.map((cargo, key) => {
                                        return <Option key={key} value={cargo.id_cargo}  >
                                            {cargo.nombre_cargo}
                                        </Option>
                                    })
                                }
                            </Select>
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