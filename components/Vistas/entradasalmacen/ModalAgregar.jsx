import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import moment from 'moment';
import { Button, Input, Form, Select, DatePicker, message, Modal } from 'antd'

const CREATE_ENTRADA = gql`
    mutation createEntradas($input: crearEntrada!) {
        createEntradas(input: $input)
    }
`

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
const GET_ALMACEN = gql`
      query getAlmacen($key: Float!) {
        getAlmacen(key: $key){
            id_almacen
            cantidadTotal
            nombreProducto
            unidad_de_medida
          }
      }
`


const ModalAgregar = ({ setVerModal, verModal, setActualizarTabla }) => {
    const { Option } = Select
    const [arrayAlmacen, setArrayAlmacen] = useState([]);
    const [arrayProvedores, setarrayProvedores] = useState([])
    const [arrayAlmacenProductos, setarrayAlmacenProductos] = useState([])
    const [guardarEntrada] = useMutation(CREATE_ENTRADA)
    const [obtenerProveedores, { loading: loadingProveedores }] = useLazyQuery(GET_PROOVEDORES,
        {
            onCompleted: (data) => {
                data ? setarrayProvedores(data.getProveedores) : setarrayProvedores([])
            }
        }
    );
    const [obtnerAlmacen, { loading: loadingCargarProductos }] = useLazyQuery(GET_ALMACEN, {
        onCompleted: (data) => {

            data ? (data.getAlmacen ? setarrayAlmacenProductos(data.getAlmacen) : setarrayAlmacenProductos([])) : setarrayAlmacenProductos([])
        }
    }
    )
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
            obtnerAlmacen({
                variables: {
                    key: Math.random()
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }, [])


    const registrarEntrada = async (event) => {
        let fecha = new Date(event.fecha)
        try {
            await guardarEntrada({
                variables: {
                    input: {
                        cantidad: parseInt(event.cantidad),
                        id_tipo_almacen: parseInt(event.tipoAlmacen),
                        id_proveedor: parseInt(event.proveedor),
                        fechaRegistro: fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2),
                        id_almacen: parseInt(event.producto)
                    }
                }
            })
            setActualizarTabla(Math.random())
            setVerModal(false)
            message.success("Entrada registrada")
        } catch (error) {
            message.error(error.message)
        }

    }


    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title={"Nueva Entrada Almacen"}
            onCancel={() => { setVerModal(false) }}
            keyboard={false}
            maskClosable={false}
            footer={false}
            width={650}
        >
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
                            <Select loading={loadingCargarProductos} >
                                {
                                    arrayAlmacenProductos ? arrayAlmacenProductos.map((producto, key) => {
                                        return <Option key={key} value={producto.id_almacen} > {producto.nombreProducto} </Option>
                                    }) : []
                                }
                            </Select>
                        </Form.Item>
                    </div>

                    <div className='col-sm-12 col-md-6' >
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


                </div>
                <div className='row' >
                    <div className='col-sm-12 col-md-6' >
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
                    <div className='col-sm-12 col-md-6' >
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
                    <div className='col-12' >
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

        </Modal>
    )
}

export default ModalAgregar