import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Modal, Input, message, Spin, Form, Select } from 'antd'

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

const ModalAgregar = ({ setVerModal, verModal }) => {
    const [obtenerAlmacenTipo, { data: dataAlmacenTipo, loading: loadingAlmacenTipo }] = useLazyQuery(GET_ALMACEN_TIPO);
    const [obtenerInsumos, { data: dataInsumo, loading: loadingInsumo }] = useLazyQuery(GET_INSUMOS,);

    const [tipo, setTipo] = useState("");
    const [unidad, setUnidad] = useState("");
    const [sucursal, setSucursal] = useState("");

    useEffect(() => {
        obtenerAlmacenTipo();
        obtenerInsumos();
    }, [])

    const guardarDatos = async () => {
        try {
            message.success("Registro exitoso")
            limpiarCampos();
            setVerModal(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    const handleChangeAlmacen = (value) => {
        setTipo(value)
    };

    const handleChangeSucursal = (value) => {
        setSucursal(value)
    };

    const limpiarCampos = () => {
        setTipo("");
        setUnidad("");
        setSucursal("");
    }
    return (
        <Modal
            destroyOnClose={true}
            visible={verModal}
            title="Nuevo Insumo"
            onCancel={() => { limpiarCampos(); setVerModal(false) }}
            cancelText="Cancelar"
            okText="Guardar"
            onOk={guardarDatos}
            keyboard={false}
            maskClosable={false}
        >
            <Form
                layout='vertical'
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
                <Form.Item label="Cantidad" name="cantidad">
                    <Input value={unidad} onChange={(e) => setUnidad(e.target.value)} />
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
                <Form.Item label="Sucursal">
                    <Select placeholder="Selccione un tipo">
                        <Select.Option value="1">Norte</Select.Option>
                        <Select.Option value="2">Sur</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalAgregar