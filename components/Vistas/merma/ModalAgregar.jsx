import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select, Button, InputNumber } from 'antd'

const GET_MERMA_TIPO = gql`
  query getTipoMermas{
    getTipoMermas{
      id_tipo_merma
      tipo
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

const CREATE_MERMA = gql`
  mutation createMerma($input: mermaInput!) {
    createMerma(input: $input)
  }
`;

const ModalAgregar = ({ setVerModal, verModal, sqlGet }) => {
    const [formulario] = Form.useForm();
    const [obtenerMermaTipo, { data: dataMermaTipo, loading: loadingMermaTipo }] = useLazyQuery(GET_MERMA_TIPO);
    const [obtenerSucursales, { data: dataSucursales, loading }] = useLazyQuery(GET_ALL_SUCUARSALES);
    const [crear_merma, { loading: loadingCreateMerma }] = useMutation(CREATE_MERMA, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });

    useEffect(() => {
        obtenerMermaTipo();
        obtenerSucursales({
            variables: {
                key: Math.random()
            }
        });
    }, [])

    const guardarDatos = async (form) => {
        console.log(form)
        try {
            await crear_merma({
                variables: {
                    input: {
                        cantidad: parseFloat(form.cantidad),
                        id_tipo_merma: form.tipo_merma,
                        id_sucursal: form.sucursal,
                    }
                },
            });
            message.success("Registro exitoso");
            setVerModal(false)
            formulario.resetFields();
        } catch (error) {
            message.error(error.message)
        }
    }

    const actualizarSucursales = () => {
        try {

            obtenerSucursales({
                variables: {
                    key: Math.random()
                }
            });
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nueva Merma"
            onCancel={() => { setVerModal(false) }}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                form={formulario}
                onFinish={guardarDatos}
            >
                <Form.Item label="Tipo Merma" name="tipo_merma" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}>
                    <Select placeholder="Seleccione un tipo de merma">
                        {dataMermaTipo && dataMermaTipo.getTipoMermas.map(function (merma, key) {
                            return <Select.Option key={key} value={merma.id_tipo_merma}>{merma.tipo}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Cantidad" name="cantidad" rules={[
                    {
                        required: true,
                        message: "La cantidad debe ser un número"
                    }
                ]}>
                    <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Sucursal" name="sucursal" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}>
                    <Select placeholder="Selccione una sucursal" onClick={() => actualizarSucursales()} >
                        {dataSucursales && dataSucursales.getAllSucursales.map(function (sucursal, key) {
                            return <Select.Option key={key} value={sucursal.id_sucursal}>{sucursal.nombre}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >{"Guardar"}</Button>
                        <Button className='float-right mr-2' onClick={() => { setVerModal(false) }} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregar