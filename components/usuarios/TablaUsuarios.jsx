import React, { useEffect } from 'react'
import { useLazyQuery, gql } from "@apollo/client";
import { Table } from 'antd';
const OBTNER_USUARIOS = gql`
query getUsuarios {
  getUsuarios {
    id
    nombre
    apellidoP
    apellidoM
    telefono
    email
    password
    tipo
  }
}
`
const TablaUsuarios = ({ actualizar, llenarDatosUsuario }) => {

    const [obtenerUsuarios, { data, loading, error }] = useLazyQuery(OBTNER_USUARIOS)

    useEffect(() => {

        try {
            obtenerUsuarios()
        } catch (error) {
            console.log(error.message);
        }


    }, [actualizar])

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key: 'key',
        }, {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        }, {
            title: 'Apellido paterno',
            dataIndex: 'apellidoP',
            key: 'apellidoP',
        }, {
            title: 'Apellido materno',
            dataIndex: 'apellidoM',
            key: 'apellidoM',
        }, {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
        }, {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        }
    ]

    const crearColumas = (usuario, key) => {
        return {
            key: key + 1,
            nombre: usuario.nombre,
            apellidoP: usuario.apellidoP,
            apellidoM: usuario.apellidoM,
            telefono: usuario.telefono,
            email: usuario.email,
            id: usuario.id,
            tipo: usuario.tipo
        }
    }

    return (
        <Table className='rounded shadow-sm' pagination={false}  loading={loading} columns={columns} dataSource={data ? (data.getUsuarios ? data.getUsuarios.map((usuario, key) => {
            return (
                crearColumas(usuario, key)
            )
        }) : []) : []} onRow={(record) => {
            return {
                onClick: () => {
                    llenarDatosUsuario(record)
                }
            }
        }} />
    )
}

export default TablaUsuarios