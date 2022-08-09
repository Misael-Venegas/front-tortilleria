import React, { useState, useEffect, useContext } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select, Button, InputNumber, Tag, DatePicker } from 'antd'
import moment from 'moment'
import { AppContext } from '../../context/Provider'


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

const GET_ALL_SUCUARSALES = gql`
    query getAllSucursales($key: Float!){
        getAllSucursales(key: $key){
            id_sucursal
            nombre
            telefono
            direccion
        }
    }
`

const CREATE_SALIDA = gql`
    mutation createSalida($input: salidaInput!){
        createSalida(input: $input)
}`

const Formulario = ({ setVerModal, setNuevaSalida, verModal, nuevaSalida }) => {
    const [formularioSalidas] = Form.useForm();
    const [arrayAlmacen, setArrayAlmacen] = useState([]);
    const [actualizarSelect, setactualizarSelect] = useState(3.1416)
    const [state, setState] = useContext(AppContext)
    const [obtenerAlmacen, { data, loading }] = useLazyQuery(GET_ALMACEN,
        {
            onCompleted: (data) => {
                data ? (data.getAlmacen ? setArrayAlmacen(data.getAlmacen) : setArrayAlmacen([])) : setArrayAlmacen([])
            }
        }
    );
    const [obtenerSucursales, { data: dataSucursales, loading: loadingSucursal }] = useLazyQuery(GET_ALL_SUCUARSALES);
    const [crearSalida, { loading: loadingSalida }] = useMutation(CREATE_SALIDA)
    const [number, setNumber] = useState(0);

    const guardarDatos = async (form) => {
        try {
            if (form.cantidad <= number) {
                await crearSalida({
                    variables: {
                        input: {
                            Fecha: form.fecha.format('YYYY-MM-DD'),
                            id_almacen: parseInt(form.insumo),
                            cantidad: parseInt(form.cantidad),
                            id_sucursal: parseInt(form.sucursal)
                        }
                    }
                })
                setNumber(0)
                setNuevaSalida(Math.random());
                setState(Math.random())
                setVerModal(false)
                message.success("Salida registrada")
                formularioSalidas.resetFields();
            } else {
                message.error("La cantidad del inventario es insuficiente")
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const cambiarStock = (value) => {
        const result = arrayAlmacen.filter(producto => producto.id_almacen == value);
        setNumber(result[0].cantidadTotal)
    }

    useEffect(() => {
        obtenerAlmacen({
            variables: {
                key: Math.random()
            }
        })
    }, [nuevaSalida, actualizarSelect]);

    useEffect(() => {
        obtenerSucursales({
            variables: {
                key: Math.random()
            }
        });
    }, [actualizarSelect]);

    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title={"Nueva Salida"}
            onCancel={() => { setVerModal(false); }}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                form={formularioSalidas}
                onFinish={guardarDatos}
                initialValues={{ fecha: moment() }}
            >
                <Form.Item label="Producto Almacen" name="insumo" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}>
                    <Select placeholder="Selccione un insumo" onChange={cambiarStock} onClick={() => setactualizarSelect(Math.random())} >
                        {arrayAlmacen && arrayAlmacen.map(function (almacen, key) {
                            return <Select.Option key={key} value={almacen.id_almacen}>{almacen.nombreProducto}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <div className='row'>
                    <div className='col-8'>
                        <Form.Item label="Cantidad" name="cantidad" rules={[
                            {
                                required: true,
                                message: "La cantidad debe ser un número"
                            }
                        ]}>
                            <InputNumber min={1} style={{ width: "100%" }} />
                        </Form.Item>
                    </div>
                    <div className='col-4'>
                        <Form.Item label="Cantidad Disponible" name="cantidadActual">
                            <Tag color="gold">{number}</Tag>
                        </Form.Item>
                    </div>
                </div>
                <Form.Item label="Fecha" name="fecha" rules={[
                    {
                        required: true,
                        message: "Seleccione una fecha"
                    }
                ]}>
                    <DatePicker style={{ width: "100%" }} format={'YYYY-MM-DD'} />
                </Form.Item>
                <Form.Item label="Sucursal" name="sucursal" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}>
                    <Select placeholder="Selccione una sucursal" onClick={() => setactualizarSelect(Math.random())} >
                        {dataSucursales && dataSucursales.getAllSucursales.map(function (sucursal, key) {
                            return <Select.Option key={key} value={sucursal.id_sucursal}>{sucursal.nombre}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >{"Registrar"}</Button>
                        <Button className='float-right mr-2' onClick={() => { setVerModal(false); }} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default Formulario