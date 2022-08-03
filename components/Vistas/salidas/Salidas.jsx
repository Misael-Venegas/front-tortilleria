import React, { useState } from 'react'
import { Button, DatePicker } from 'antd'
import TableSalidas from './TableSalidas'
import Formulario from './Formulario';

const Salidas = () => {
    const [verModal, setVerModal] = useState(false);
    const [fecha, setFecha] = useState("")
    const [nuevaSalida, setNuevaSalida] = useState(3.1416)

    return (
        <>
            <div className='row' >
                <div className='col-md-6 col-sm-12 ' >
                    <DatePicker style={{ width: "100%" }} onChange={(e, date) => setFecha(date)} format={'YYYY-MM-DD'}/>
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Salida</Button>
                </div>
            </div>
            <div className='row'>
                <TableSalidas fecha={fecha} nuevaSalida={nuevaSalida}/>
            </div>
            <Formulario setVerModal={setVerModal} verModal={verModal} setNuevaSalida={setNuevaSalida} nuevaSalida={nuevaSalida}/>
        </>
    )
}

export default Salidas