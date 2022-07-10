import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import TablaEntradas from './TablaEntradas'
import ModalAgregar from './ModalAgregar'

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)

    const buscar = (e) => {

    }

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese ...." onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Nueva Entrada</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaEntradas/>
            </div>
            <ModalAgregar  setVerModal={setVerModal} verModal={verModal}/>
        </>
    )
}

export default Formulario