import React, { useEffect, useState } from 'react'
import { message, Table } from 'antd'
import { useLazyQuery, gql } from '@apollo/client'

const GET_USUARIOS = gql`
      query getUsuarios{
            getUsuarios {
                id_empleado
                nombre
                apellidoP
                apellidoM
                telefono
                email
                password
                id_cargo
                direccion
           }
      }
`

const TablaEpleados = ({ actualizarTabla }) => {
    const [arrayEmpleado, setarrayEmpleado] = useState([])
    const [obtenerUsuarios, { loading }] = useLazyQuery(GET_USUARIOS, {
        onCompleted: (data) => {
            console.log(data)
            data ? (data.getUsuarios ? setarrayEmpleado(data.getUsuarios) : setarrayEmpleado([])) : setarrayEmpleado([])
        }
    })
    useEffect(() => {

        try {

            obtenerUsuarios()
        } catch (error) {
            message.error(error.message)
        }

    }, [actualizarTabla])

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

    const crearFila = (usuario, key) => {
        return {
            key: key,
            nombre: usuario.nombre + " " + usuario.apellidoP + " " + usuario.apellidoM,
            telefono: usuario.telefono,
            email: usuario.email,
            cargo:usuario.id_cargo,
            direccion: usuario.direccion,
            
        }
    }

    return (
        <div className='pt-4 table-respondive' >
            <Table columns={columns} loading={loading} dataSource={arrayEmpleado.length > 0 ? arrayEmpleado.map((empleado, key) => {
                return crearFila(empleado, key)
            }) : []} />
        </div>
    )
}

export default TablaEpleados