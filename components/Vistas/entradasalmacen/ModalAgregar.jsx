import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select, InputNumber, DatePicker, Button } from 'antd'
import moment from 'moment';

const GET_ALMACEN = gql`
  query getAlmacen{
    getAlmacen{
        id_almacen
        cantidad
        id_insumos
        id_tipo_almacen
        id_sucursal
        nombreTipoAlmacen
        nombreSucursal
        nombreInsumo
    }
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

const CREATE_ENTRADA = gql`
  mutation createEntradas($input: EntradasInput!, $inputAlmacen: EntradasAlmacenInput!) {
    createEntradas(input: $input, inputAlmacen: $inputAlmacen)
  }
`

const ModalAgregar = ({ setVerModal, verModal, sqlGet, datosEditar, setDatosEditar }) => {
    const [formulario] = Form.useForm();
    const [obtenerAlmacen, { data, loading }] = useLazyQuery(GET_ALMACEN);
    const [obtenerProveedores, { data: dataProveedores, loading: loadingProveedores }] = useLazyQuery(GET_PROOVEDORES);
    const [crear_entrada, { loading: loadingEntrada }] = useMutation(CREATE_ENTRADA, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });
    const [idAlmacen, setIdAlmacen] = useState(null)
    
    const guardarDatos = async (form) => {
        try {
            if (datosEditar) {

                message.success("Actulización Correcta")
            } else {
                await crear_entrada({
                    variables: {
                        input: {
                            fecha: form.fecha.format('YYYY-MM-DD'),
                            id_proveedor: form.proveedor,
                        },
                        inputAlmacen: {
                            id_almacen: idAlmacen,
                            cantidad: form.cantidad,
                            id_insumos: form.producto,
                        }
                    },
                });
                message.success("Registro exitoso")
            }
            formulario.resetFields();
            setVerModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        obtenerAlmacen();
        obtenerProveedores();
    }, [])

    useEffect(() => {
        if (datosEditar) {
            console.log(datosEditar)
            formulario.setFieldsValue({
                producto: datosEditar.id_insumos,
                cantidad: datosEditar.cantidad,
                proveedor: datosEditar.id_proveedor,
                fecha: datosEditar.fecha ? moment(new Date(datosEditar.fecha)) : "",
            })
        } else {
            formulario.resetFields();
        }
    }, [datosEditar]);

    const handleChange = (value) => {
        console.log("SALIDA: ", value)
        setIdAlmacen(value);
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title={datosEditar ? "Editar Entrada Almacen" : "Nueva Entrada Almacen"}
            onCancel={() => { setVerModal(false); setDatosEditar(null) }}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                form={formulario}
                onFinish={guardarDatos}
            >
                <Form.Item label="Producto" name="producto" rules={[
                    {
                        required: true,
                        message: "Seleccione una opción"
                    }
                ]}>
                    <Select placeholder="Seleccione un producto" onChange={(value)=>setIdAlmacen(value)}>
                        {data && data.getAlmacen.map(function (almacen, key) {
                            return <Select.Option key={key} value={almacen.id_almacen}>{almacen.nombreInsumo.toUpperCase() + `: Sucursal [${almacen.nombreSucursal}]`}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Cantidad" name="cantidad" rules={[
                    {
                        required: true,
                        message: "Debe ingresar la cantidad"
                    }
                ]}>
                    <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Proveedor" name="proveedor">
                    <Select placeholder="Seleccione un proveedor">
                        {dataProveedores && dataProveedores.getProveedores.map(function (proveedor, key) {
                            return <Select.Option key={key} value={proveedor.id_proveedor}>{proveedor.nombre}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Fecha" name="fecha" rules={[
                    {
                        required: true,
                        message: "Seleccione la fecha de compra"
                    }
                ]}>
                    <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: '100%' }}
                        defaultValue={moment()}
                    />
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >{datosEditar ? "Actualizar" : "Guardar"}</Button>
                        <Button className='float-right mr-2' onClick={() => { setVerModal(false); setDatosEditar(null) }} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregar