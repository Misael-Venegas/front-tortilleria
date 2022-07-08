import React from 'react'
import { Table } from 'antd'
const TablaEpleados = () => {

    const columns = [
        {
            title: "#",
            dataIndex: "key",
            name: "key",
        }, {
            title: "Nombre",
            dataIndex: "nombre",
            name: "nombre"
        }, {
            title: "Teléfono",
            dataIndex: "telefono",
            name: "telefono"
        }, {
            title: "email",
            dataIndex: "email",
            name: "email"
        }, {
            title: "Cargo",
            dataIndex: "cargo",
            name: "cargo"
        }, {
            title: "Dirección",
            dataIndex: "direccion",
            name: "direccion"
        }, {
            title: "Opciones",
            dataIndex: "opciones",
            name: "opciones"
        }
    ]

    return (
        <div className='pt-4 table-respondive' >
            <Table columns={columns} />
        </div>
    )
}

export default TablaEpleados