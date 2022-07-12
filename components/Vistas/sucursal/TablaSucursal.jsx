import React, { useState } from 'react'
import { Table } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AlertElinarSucursal } from './ModalEliminarSucursal'
import ModalEditarSucursal from './ModalEditarSucursal';

const TablaSucursal = ({ loading, arraySucursales, setActualizarTabla }) => {
    const { alertEliminarSucursal } = AlertElinarSucursal()
    const [sucursal, setsucursal] = useState(null)

    const [verModalEditarSucursal, setVerModalEditarSucursal] = useState(false)
    const columnas = [
        {
            title: "#",
            dataIndex: "key",
            name: "key"
        }, {
            title: "Nombre",
            dataIndex: "nombre",
            name: "nombre"
        }, {
            title: "Dirección",
            dataIndex: "direccion",
            name: "direccion"
        }, {
            title: "Teléfono",
            dataIndex: "telefono",
            name: "telefono"
        }, {
            title: "Opciones",
            dataIndex: "opciones",
            name: "opciones"
        }
    ]

    const crearFila = (key, sucursal) => {
        return {
            key: key + 1,
            nombre: sucursal.nombre,
            direccion: sucursal.direccion,
            telefono: sucursal.telefono,
            opciones: <span> <span style={{ color: '#40A9FF' }} ><EditOutlined className='seleccionarComponente' onClick={() => {
                setsucursal(sucursal)
                setVerModalEditarSucursal(true)
            }} /></span> &nbsp;
                <span style={{ color: 'red' }} > <DeleteOutlined className='seleccionarComponente' onClick={() => alertEliminarSucursal(sucursal.id_sucursal, setActualizarTabla)} /> </span> </span>
        }
    }

    return (
        <>
            <Table columns={columnas} className='pt-4' loading={loading} dataSource={arraySucursales ? arraySucursales.map((sucursal, key) => {
                return (
                    crearFila(key, sucursal)
                )
            }) : []} />
            <ModalEditarSucursal verModalEditarSucursal={verModalEditarSucursal} setVerModalEditarSucursal={setVerModalEditarSucursal} sucursal={sucursal} setActualizarTabla={setActualizarTabla} />
        </>
    )
}

export default TablaSucursal