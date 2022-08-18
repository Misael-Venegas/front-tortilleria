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
const UPDATE_USER = gql`
    mutation editarUsuario($input: editarUsuarioInput!){
            editarUsuario(input: $input)
    }
`

const ModalEditarEmpleado = ({ modalEditarEmpleado, setModalEditarEmpleado, datosEmpleado, setActualizarTabla, idCargo, setidCargo }) => {

    const [arrayCargos, setarrayCargos] = useState([])

    const [obtenerCargos, { loading }] = useLazyQuery(GET_ALL_CARGOS, {
        onCompleted: (data) => {
            data ? (data.getAllCargos ? setarrayCargos(data.getAllCargos) : setarrayCargos([])) : setarrayCargos([])
        }
    })
    const [editar_usuario] = useMutation(UPDATE_USER)

    useEffect(() => {
        obtenerCargos({
            variables: {
                key: Math.random()
            }
        })
    }, [])

    const editarRegistros = async (event) => {
        if (idCargo === 1 || idCargo === 2) {
            if (event.email !== event.verificarEmail) {
                message.error("Error el campo email y verificar email no coinciden")
                return
            }
        }

        try {
            await editar_usuario({
                variables: {
                    input: {
                        id_empleado: datosEmpleado.id_empleado,
                        nombre: event.nombres,
                        apellidoP: event.paterno,
                        apellidoM: event.materno,
                        telefono: event.telefono,
                        email: event.email,
                        id_cargo: parseInt(event.cargo),
                        direccion: event.direccion,
                    }
                }
            })
            message.success("Registro actualizado")
            setActualizarTabla(Math.random())
            setModalEditarEmpleado(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            title="Nuevo empleado"
            visible={modalEditarEmpleado}
            onCancel={() => setModalEditarEmpleado(false)}
            width={800}
            footer={false}
            maskClosable={false}
            keyboard={false}
        >
            <Form
                name='formEmpleados'
                onFinish={editarRegistros}
                layout='vertical'
            >
                <div className='row' >
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Nombre(s)"
                            name="nombres"
                            initialValue={datosEmpleado ? datosEmpleado.nombre : ""}
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
                            initialValue={datosEmpleado ? datosEmpleado.apellidoP : ""}
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
                            initialValue={datosEmpleado ? datosEmpleado.apellidoM : ""}
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
                            initialValue={datosEmpleado ? datosEmpleado.telefono : ""}
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Input maxLength={10} minLength={10} />
                        </Form.Item>
                    </div>
                </div>

                <div className='row' >
                    <div className='col-md-6 col-sm-12' >
                        <Form.Item
                            label="Dirección"
                            name="direccion"
                            initialValue={datosEmpleado ? datosEmpleado.direccion : ""}
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
                            initialValue={datosEmpleado ? datosEmpleado.id_cargo : ""}
                            rules={[
                                {
                                    required: true,
                                    message: 'Este campo es requerido'
                                }
                            ]}
                        >
                            <Select style={{ width: "100%" }} loading={loading} onChange={(e) => setidCargo(parseInt(e))} >
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

                {
                    idCargo !== 3 && <div className='row'  >
                        <div className='col-md-6 col-sm-12' >
                            <Form.Item
                                label="email"
                                name="email"
                                initialValue={datosEmpleado ? datosEmpleado.email : ""}
                                rules={idCargo !== 3 ? [
                                    {
                                        required: true,
                                        message: 'Este campo es requerido'
                                    }
                                ] : []}
                            >
                                <Input type="email" />
                            </Form.Item>
                        </div>
                        <div className='col-md-6 col-sm-12' >
                            <Form.Item
                                label="Verificar email"
                                name="verificarEmail"

                                rules={idCargo !== 3 ? [
                                    {
                                        required: idCargo !== 3 ? true : false,
                                        message: 'Este campo es requerido'
                                    }
                                ] : []}
                            >
                                <Input type="email" />
                            </Form.Item>
                        </div>
                    </div>
                }

                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >Guardar</Button>
                        <Button className='float-right mr-2' onClick={() => setModalEditarEmpleado(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal >
    )
}

export default ModalEditarEmpleado