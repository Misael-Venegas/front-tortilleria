import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Modal, Input, message, Form, Button } from 'antd'

const EDITAR_TIPO_ALMACEN = gql`
   mutation editaarTipoAlmacen($idTipoAlmacen: Int!, $nombre: String!) {
            editaarTipoAlmacen(idTipoAlmacen: $idTipoAlmacen, nombre: $nombre)
   }
`

const ModalEditar = ({ setVerEditarModa, verEditarModal, datos, sqlGet }) => {
    console.log(datos)
    const [editarAlmacen, { loading }] = useMutation(EDITAR_TIPO_ALMACEN, {
        refetchQueries: [
            { query: sqlGet }
        ]
    })
    const guardarDatos = async (event) => {
        try {
            await editarAlmacen({
                variables: {
                    idTipoAlmacen: parseInt(datos.id_tipo_almacen),
                    nombre: event.nombre
                }
            })

            message.success("Datos actualizados")
            setVerEditarModa(false)
        } catch (error) {
            message.error(error.message)
        }
    }

    return (
        <Modal
            destroyOnClose={true}
            visible={verEditarModal}
            title="Editar tipo almacén"
            onCancel={() => setVerEditarModa(false)}
            keyboard={false}
            maskClosable={false}
            footer={false}
        >
            <Form
                layout='vertical'
                onFinish={guardarDatos}
            >
                <Form.Item label="Nombre"
                    name="nombre"
                    initialValue={datos.nombre}
                    rules={[
                        {
                            required: true,
                            message: "Este campo es requerido",
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <div className='row' >
                    <div className='col-12' >
                        <Button type='primary' htmlType='submit' className='float-right' >Guardar</Button>
                        <Button className='float-right mr-2' onClick={() => setVerEditarModa(false)} >Cancelar</Button>
                    </div>
                </div>
            </Form>
        </Modal>
    )
}

export default ModalEditar