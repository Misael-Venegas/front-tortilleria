import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Modal, Input, message, Form, Select, Button } from 'antd'
import { parse } from 'graphql';

const CREATE_INSUMOS = gql`
  mutation createInsumo($input: insumosInput!) {
    createInsumo(input: $input)
  }
`;

const UPDATE_INSUMOS = gql`
  mutation updateInsumo($input: insumosUpdate!) {
    updateInsumo(input: $input)
  }
`;

const GET_ALMACEN_TIPO = gql`
  query getAlmacenTipo{
    getAlmacenTipo{
      id_tipo_almacen
      nombre
    }
  }
`

const ModalAgregar = ({ setVerModal, verModal, sqlGet, data, setDatosEditar }) => {
    const [formularioInsumos] = Form.useForm();
    const [crear_insumo, { loading }] = useMutation(CREATE_INSUMOS, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });
    const [actualizar_insumo, { loading: loadingUpdate }] = useMutation(UPDATE_INSUMOS, {
        refetchQueries: [
            { query: sqlGet },
        ],
    });
    const [obtenerAlmacenTipo, { data: dataTipoAlmacen }] = useLazyQuery(GET_ALMACEN_TIPO);

    const guardarDatos = async (form) => {
        try {
            if (data) {//ACTUALIZAR
                await actualizar_insumo({
                    variables: {
                        input: {
                            id_insumos: data.id_insumos,
                            descripcion: form.descripcion,
                            unidad_medida: form.unidad_medida,
                            id_tipo_almacen: parseInt(form.tipo_almacen)
                        }
                    },
                });
                message.success("Actualización exitosa");
            } else {//AGREGAR
                await crear_insumo({
                    variables: {
                        input: {
                            descripcion: form.descripcion,
                            unidad_medida: form.unidad_medida,
                            id_tipo_almacen: form.tipo_almacen
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

    useEffect(() => {
        obtenerAlmacenTipo();
    }, [])

    useEffect(() => {
        if (data) {
            formularioInsumos.setFieldsValue({
                descripcion: data.descripcion,
                unidad_medida: data.unidad_medida,
                tipo_almacen: parseInt(data.id_tipo_almacen),
            })
        } else {
            formularioInsumos.resetFields();
        }
    }, [data])


    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title={data ? "Editar Insumo" : "Nuevo Insumo"}
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
                <Form.Item label="Descripción" name="descripcion" rules={[
                    {
                        required: true,
                        message: "Este campo es requerido",
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Unidad Medida" name="unidad_medida" rules={[
                    {
                        required: true,
                        message: "Este campo es requerido",
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Tipo Almacen" name="tipo_almacen" rules={[
                    {
                        required: true,
                        message: "Seleccione una opcion"
                    }
                ]}
                >
                    <Select placeholder="Selccione un tipo" >
                        {dataTipoAlmacen && dataTipoAlmacen.getAlmacenTipo.map(function (insumo, key) {
                            return <Select.Option key={key} value={insumo.id_tipo_almacen}>{insumo.nombre}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >{data ? "Actualizar" : "Guardar"}</Button>
                        <Button className='float-right mr-2' onClick={() => { setVerModal(false); setDatosEditar(null) }} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalAgregar