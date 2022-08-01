import { Button } from 'antd'
import React, { useState, useEffect } from 'react'
import ModalAgregar from './ModalAgregar'

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)
    const [actualizarTabla, setactualizarTabla] = useState(3.1416)
    return (
        <>
            <Button className='float-right' type='primary' onClick={() => setVerModal(true)} >Registrar</Button>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} setActualizarTabla={setactualizarTabla} />
        </>
    )
}

export default Formulario