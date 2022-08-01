import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Button, Input, Form, Select, DatePicker, message } from 'antd'

const GET_PROOVEDORES = gql`
  query getProveedores{
    getProveedores{
      id_proveedor
      nombre
      correo
      telefono
    }
  }
`
const GET_ALMACEN_TIPO = gql`
  query getAlmacenTipo{
    getAlmacenTipo{
      id_tipo_almacen
      nombre
    }
  }
`

const Formulario = () => {
    const { Option } = Select
    const [arrayAlmacen, setArrayAlmacen] = useState([]);
    const [arrayProvedores, setarrayProvedores] = useState([])
    const [obtenerProveedores, { loading: loadingProveedores }] = useLazyQuery(GET_PROOVEDORES,
        {
            onCompleted: (data) => {
                data ? setarrayProvedores(data.getProveedores) : setarrayProvedores([])
            }
        }
    );

    const [obtenerAlmacenTipo, { loading }] = useLazyQuery(GET_ALMACEN_TIPO,
        {
            onCompleted: (data) => {
                data ? setArrayAlmacen(data.getAlmacenTipo) : setArrayAlmacen([])
            }
        }
    );
    useEffect(() => {
        try {
            obtenerProveedores()
            obtenerAlmacenTipo()
        } catch (error) {
            message.error(error.message)
        }
    }, [])


    const registrarEntrada = (event) => {
        console.log(event)
        let fecha = new Date(event.fecha)

    }
    return (
        <>

            <Form
                name='form-entradas'
                onFinish={registrarEntrada}
                layout="vertical"
            >
                <div className='row' >
                    <div className='col-sm-12 col-md-6' >
                        <Form.Item
                            label="Producto"
                            name="producto"
                            rules={[
                                {
                                    required: true,
                                    message: "Este campo es requerido"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div className='col-sm-12 col-md-3' >
                        <Form.Item
                            label="Cantidad"
                            name="cantidad"
                            rules={[
                                {
                                    required: true,
                                    message: "Este campo es requerido"
                                }
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </div>

                    <div className='col-sm-12 col-md-3' >
                        <Form.Item
                            label="Unidad de medida"
                            name="unidadMedida"
                            rules={[{
                                required: true,
                                message: "Este campo es requerido"
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                </div>
                <div className='row' >
                    <div className='col-sm-12 col-md-4' >
                        <Form.Item
                            label="Proveedor"
                            name="proveedor"
                            rules={[
                                {
                                    required: true,
                                    message: "Este campo es requerido"
                                }
                            ]}
                        >
                            <Select loading={loadingProveedores} >
                                {
                                    arrayProvedores ? arrayProvedores.map((proveedor, key) => {
                                        return <Option key={key} value={proveedor.id_proveedor} > {proveedor.nombre} </Option>
                                    }) : []
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='col-sm-12 col-md-4' >
                        <Form.Item
                            label="Tipo de almacen"
                            name="tipoAlmacen"
                            rules={[{
                                required: true,
                                message: "Este campo es requerido"
                            }]}
                        >
                            <Select loading={loading} >
                                {
                                    arrayAlmacen ? arrayAlmacen.map((tipo, key) => {
                                        return <Option value={tipo.id_tipo_almacen} key={key} >
                                            {tipo.nombre}
                                        </Option>
                                    }) : []
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='col-sm-12 col-md-4' >
                        <Form.Item
                            label="Fecha"
                            name="fecha"
                            rules={[
                                {
                                    required: true,
                                    message: "Este campo es requerido"
                                }
                            ]}
                        >
                            <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                    </div>

                </div>
                <div className='row' >
                    <div className='col-12' >
                        <Button htmlType='submit' className='float-right' type='primary'>Registrar</Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default Formulario