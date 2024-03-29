import { Button, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import ModalAgregar from './ModalAgregar'
import TablaEntradas from './TablaEntradas'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'

const Formulario = () => {
    const [fecha, setfecha] = useState("")
    const [verModal, setVerModal] = useState(false)
    const [actualizarTabla, setactualizarTabla] = useState(3.1416)
    useEffect(() => {
        const fcha = new Date();
        const fechaActua = fcha.getFullYear() + "-" + ("0" + (fcha.getMonth() + 1)).slice(-2) + "-" + ("0" + fcha.getDate()).slice(-2)
        setfecha(fechaActua)
    }, [])

    return (
        <>
            <div className='row' >
                <div className='col-md-6 col-sm-12' >
                    <DatePicker onChange={(date, dateInfo) => setfecha(dateInfo)} placeholder="Selecciona la fecha" style={{ width: "65%" }} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button className='float-right ml-2' type='primary' onClick={() => setVerModal(true)} >Registrar</Button>
                    <ReactHtmlTableToExcel
                        id="test-table-xls-button"
                        className="ant-btn ant-btn-primary ant-btn-background-ghost float-right"
                        table="tablaEntradas"
                        filename="entradas"
                        sheet="Reporte entradas"
                        buttonText="Exportar excel"
                    />
                </div>
            </div>

            <TablaEntradas fecha={fecha} actualizarTabla={actualizarTabla} />
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} setActualizarTabla={setactualizarTabla} />
        </>
    )
}

export default Formulario