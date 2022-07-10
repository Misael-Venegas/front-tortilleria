import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import ModalAgregarProveedor from './ModalAgregarProveedor'
import TablaProveedores from './TablaProveedores'

const Formulario = () => {
    const [verModalAgregarProveedor, setVerModalAgregarProveedor] = useState(false)

    const buscar = (e) => {
    
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del Proveedor" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModalAgregarProveedor(true)} >Agregar Proveedor</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaProveedores/>
            </div>
            <ModalAgregarProveedor setVerModal={setVerModalAgregarProveedor} verModal={verModalAgregarProveedor}/>
        </>
    )
}

export default Formulario