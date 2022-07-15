import React from 'react'
import { Table, Tooltip } from 'antd'
import { RetweetOutlined } from '@ant-design/icons'
const colums = [
    {
        title: "#",
        dataIndex: "key",
        name: "key"
    }, {
        title: "Producto",
        dataIndex: "producto",
        name: "producto"
    }, {
        title: "Cantidad",
        dataIndex: "cantidad",
        name: "cantidad"
    }, {
        title: "Precio",
        dataIndex: "precio",
        name: "precio"
    }, {
        title: "Total",
        dataIndex: "total",
        name: "total"
    }, {
        title: "Opciones",
        dataIndex: "opciones",
        name: "opciones"
    }
]

const TablaVentas = () => {
    return (
        <div className='pt-3' >
            <div className='row' >
                <div className='col-md-6 col-sm-12' >
                    <span>Lista de venta</span>
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Tooltip title="Limpiar tabla">
                        <span className='float-right seleccionarComponente' style={{ fontSize: "16pt", color: "#40A9FF" }}> <RetweetOutlined /> </span>
                    </Tooltip>
                </div>
            </div>
            <Table columns={colums} />
        </div>
    )
}

export default TablaVentas