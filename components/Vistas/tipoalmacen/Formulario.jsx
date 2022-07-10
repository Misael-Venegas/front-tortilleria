import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import TablaTipoAlmacen from './TablaTipoAlmacen'
import ModalAgregar from './ModalAgregar'

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)

    const buscar = (e) => {

    }

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del tipo de almacén" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Tipo Almacén</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaTipoAlmacen/>
            </div>
            <ModalAgregar  setVerModal={setVerModal} verModal={verModal}/>
        </>
    )
}

export default Formulario