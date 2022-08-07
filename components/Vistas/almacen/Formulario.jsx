import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import TablaAlmacen from './TablaAlmacen'
import ModalAgregar from './ModalAgregar'
import { RetweetOutlined } from '@ant-design/icons'
const Formulario = () => {
    const [verModal, setVerModal] = useState(false)
    const [actualizarTabla, setActualizarTabla] = useState(3.1416)

    return (
        <>
            <div className='row' >
                <div className='col-12' >
                    <Button className='float-right' type='primary' onClick={() => setVerModal(true)}  >Agregar producto </Button>

                </div>
            </div>
            <p style={{ fontSize: 15, color: "#40A9FF" }} className=" pt-2  seleccionarComponente"
                onClick={() => setActualizarTabla(Math.random())}>
                Actualizar <RetweetOutlined />
            </p>
            <div className='table-responsive'>
                <TablaAlmacen actualizarTabla={actualizarTabla} setActualizarTabla={setActualizarTabla} />
            </div>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} setActualizarTabla={setActualizarTabla} />
        </>
    )
}

export default Formulario