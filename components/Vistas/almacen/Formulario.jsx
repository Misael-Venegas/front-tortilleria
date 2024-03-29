import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd'
import TablaAlmacen from './TablaAlmacen'
import ModalAgregar from './ModalAgregar'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)
    const [actualizarTabla, setActualizarTabla] = useState(3.1416)

    return (
        <>
            <div className='row' >
                <div className='col-12' >
                    <Button className='float-right ml-2' type='primary' onClick={() => setVerModal(true)}  >Agregar producto </Button>

                    <ReactHtmlTableToExcel
                        id="test-table-xls-button"
                        className="ant-btn ant-btn-primary ant-btn-background-ghost float-right "
                        table="tablaAlmacen"
                        filename="almacén"
                        sheet="Reporte almacén"
                        buttonText="Exportar excel"
                    />

                </div>
            </div>



            <div className='table-responsive'>
                <TablaAlmacen actualizarTabla={actualizarTabla} setActualizarTabla={setActualizarTabla} />
            </div>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} setActualizarTabla={setActualizarTabla} />
        </>
    )
}

export default Formulario