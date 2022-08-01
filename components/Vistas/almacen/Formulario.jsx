import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import TablaAlmacen from './TablaAlmacen'
import ModalAgregar from './ModalAgregar'

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)
    const [actualizarTabla, setActualizarTabla] = useState(3.1416)

    return (
        <>
            <Button className='float-right' type='primary' onClick={() => setVerModal(true)}  >Agregar producto </Button>
            <div className='table-responsive'>
                <TablaAlmacen actualizarTabla={actualizarTabla} setActualizarTabla={setActualizarTabla} />
            </div>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} setActualizarTabla={setActualizarTabla} />
        </>
    )
}

export default Formulario