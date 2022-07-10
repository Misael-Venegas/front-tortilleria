import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import TablaAlmacen from './TablaAlmacen'
import ModalAgregar from './ModalAgregar'

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)

    const buscar = (e) => {

    }

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del insumo" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Insumo al Almacén</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaAlmacen/>
            </div>
            <ModalAgregar  setVerModal={setVerModal} verModal={verModal}/>
        </>
    )
}

export default Formulario