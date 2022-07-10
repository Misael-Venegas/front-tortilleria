import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import TablaMermas from './TablaMermas'
import ModalAgregar from './ModalAgregar'

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)

    const buscar = (e) => {

    }

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del tipo de merma" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Tipo de Merma</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaMermas/>
            </div>
            <ModalAgregar  setVerModal={setVerModal} verModal={verModal}/>
        </>
    )
}

export default Formulario