import React, { useEffect, useState } from 'react'
import { message, Table, Input, Button } from 'antd'
import { useLazyQuery, gql } from '@apollo/client'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { AlertEliminarEmpleado } from './AlertEliminarEmpleado'
import ModalEditarEmpleado from './ModalEditarEmpleado'

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
                nombre_cargo
           }
      }
`

const TablaEpleados = ({ actualizarTabla, setActualizarTabla, setOpenModalNuevoEmpleado }) => {
    const { Search } = Input;
    const { alertEliminarEmpleado } = AlertEliminarEmpleado();
    const [arrayEmpleado, setarrayEmpleado] = useState([]);
    const [arryAuxiliar, setarryAuxiliar] = useState([])
    const [editarEmpleado, seteditarEmpleado] = useState(false)
    const [empleado, setEmpleado] = useState(null)
    const [obtenerUsuarios, { loading }] = useLazyQuery(GET_USUARIOS, {
        onCompleted: (data) => {
            if (data) {
                if (data.getUsuarios) {
                    setarrayEmpleado(data.getUsuarios)
                    setarryAuxiliar(data.getUsuarios)
                } else {
                    setarrayEmpleado([])
                    setarryAuxiliar([])
                }
            } else {
                setarrayEmpleado([])
                setarryAuxiliar([])
            }
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
            cargo: usuario.nombre_cargo,
            direccion: usuario.direccion,
            opciones: <span>
                <span className='seleccionarComponente' style={{ color: "red" }} ><DeleteOutlined onClick={() => alertEliminarEmpleado(usuario.id_empleado, setActualizarTabla)} /></span> &nbsp;
                <span className='seleccionarComponente' style={{ color: "#40A9FF" }} onClick={() => {
                    setEmpleado(usuario)
                    seteditarEmpleado(true)
                }} > <EditOutlined /> </span>
            </span>
        }
    }
    const buscarEmpleado = (e) => {
        if (e === "") {
            setarrayEmpleado(arryAuxiliar)
            return
        }

        const auxiliar = arryAuxiliar.filter((usuario) => {
            return usuario.nombre.toLowerCase().includes(e.toLowerCase())
        })
        setarrayEmpleado(auxiliar)
    }
    return (
        <>
            <div className='row' >
                <div className='col-md-4 col-sm-12' >
                    <Search onSearch={buscarEmpleado} enterButton allowClear placeholder='Ingresa el nombre del empleado' />
                </div>
                <div className='col-md-8 col-sm-12' >
                    <Button className='float-right' type='primary' onClick={() => setOpenModalNuevoEmpleado(true)} >Agregar empleado</Button>
                </div>
            </div>
            <div className='pt-4 table-responsive' >
                <Table columns={columns} loading={loading} dataSource={arrayEmpleado.length > 0 ? arrayEmpleado.map((empleado, key) => {
                    return crearFila(empleado, key)
                }) : []} />

                <ModalEditarEmpleado modalEditarEmpleado={editarEmpleado} setModalEditarEmpleado={seteditarEmpleado} datosEmpleado={empleado} setActualizarTabla={setActualizarTabla} />
            </div>
        </>
    )
}

export default TablaEpleados