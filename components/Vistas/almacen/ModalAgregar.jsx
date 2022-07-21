import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select, Button, InputNumber } from 'antd'

const GET_INSUMOS = gql`
  query getInsumos{
    getInsumos{
        id_insumos
        descripcion
        unidad_medida
        id_tipo_almacen
        tipo_almacen
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

const CREATE_ALMACEN = gql`
  mutation createAlmacenProducto($input: almacenInput!) {
    createAlmacenProducto(input: $input)
  }
`;

const UPDATE_ALMACEN = gql`
  mutation updateAlmacenProducto($input: almacenUpdate!) {
    updateAlmacenProducto(input: $input)
  }
`;

const ModalAgregar = ({ setVerModal, verModal, sqlGet, datosEditar, setDatosEditar }) => {
    const [obtenerAlmacenTipo, { data: dataAlmacenTipo, loading: loadingAlmacenTipo }] = useLazyQuery(GET_ALMACEN_TIPO);
    const [obtenerInsumos, { data: dataInsumo, loading: loadingInsumo }] = useLazyQuery(GET_INSUMOS,);
    const [obtenerSucursales, { data: dataSucursales, loading }] = useLazyQuery(GET_ALL_SUCUARSALES);
    const [crear_almacen, { loading: loadingCreateAlmacen }] = useMutation(CREATE_ALMACEN, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });
    const [update_almacen, { loading: loadingUpdateAlmacen }] = useMutation(UPDATE_ALMACEN, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });
    const [formularioInsumos] = Form.useForm();

    useEffect(() => {
        obtenerAlmacenTipo();
        obtenerInsumos();
        obtenerSucursales({
            variables: {
                key: Math.random()
            }
        });
    }, [])

    useEffect(() => {
        if (datosEditar) {
            formularioInsumos.setFieldsValue({
                cantidad: datosEditar.cantidad,
                insumo: datosEditar.id_insumos,
                tipo_almacen: datosEditar.id_tipo_almacen,
                sucursal: datosEditar.id_sucursal,
            })
        } else {
            formularioInsumos.resetFields();
        }
    }, [datosEditar])

    const guardarDatos = async (form) => {
        try {
            if (datosEditar) {//ACTUALIZAR
                await update_almacen({
                    variables: {
                        input: {
                            id_almacen: datosEditar.id_almacen,
                            cantidad: parseFloat(form.cantidad),
                            id_insumos: form.insumo,
                            id_tipo_almacen: form.tipo_almacen,
                            id_sucursal: form.sucursal
                        }
                    },
                });
                message.success("Actualización exitosa");
            } else {//AGREGAR
                await crear_almacen({
                    variables: {
                        input: {
                            cantidad: parseFloat(form.cantidad),
                            id_insumos: form.insumo,
                            id_tipo_almacen: form.tipo_almacen,
                            id_sucursal: form.sucursal
                        }
                    },
                });
                message.success("Registro exitoso");
            }
            setVerModal(false);
            formularioInsumos.resetFields();
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title={datosEditar?"Actulizar Insumo Almacen":"Nuevo Insumo Almacen"}
            onCancel={() => { setVerModal(false); setDatosEditar(null) }}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                form={formularioInsumos}
                onFinish={guardarDatos}
            >
                <Form.Item label="Insumo" name="insumo" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}>
                    <Select placeholder="Selccione un insumo" >
                        {dataInsumo && dataInsumo.getInsumos.map(function (insumo, key) {
                            return <Select.Option key={key} value={insumo.id_insumos}>{insumo.descripcion}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Cantidad" name="cantidad" rules={[
                    {
                        required: true,
                        message: "La cantidad debe ser un número"
                    }
                ]}>
                    <InputNumber min={1} style={{ width: "100%" }}/>
                </Form.Item>
                <Form.Item label="Tipo Almacen" name="tipo_almacen" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}>
                    <Select placeholder="Selccione un tipo">
                        {dataAlmacenTipo && dataAlmacenTipo.getAlmacenTipo.map(function (insumo, key) {
                            return <Select.Option key={key} value={insumo.id_tipo_almacen}>{insumo.nombre}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Sucursal" name="sucursal" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}>
                    <Select placeholder="Selccione una sucursal">
                        {dataSucursales && dataSucursales.getAllSucursales.map(function (sucursal, key) {
                            return <Select.Option key={key} value={sucursal.id_sucursal}>{sucursal.nombre}</Select.Option>
                        })}
                    </Select>
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