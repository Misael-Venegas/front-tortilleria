import React, { useState, useEffect } from 'react'
import { Table, Button, Input, message } from 'antd'
import { gql, useLazyQuery } from '@apollo/client';
import ModalAgregarCargo from './ModalAgregarCargo';
import { DeleteOutlined } from '@ant-design/icons'
import { AlertElinarCargo } from './AlertElinarCargo'

const GET_ALL_CARGOS = gql`
    query getAllCargos($key: Float!) {
          getAllCargos(key: $key){
            id_cargo
            nombre_cargo
          }
    }
`
const Cargo = () => {

    const [verModalNuevoCargo, setverModalNuevoCargo] = useState(false)
    const [actualizarTabla, setActualizarTabla] = useState(3.1416)
    const [arrayCargos, setarrayCargos] = useState([])
    const [arrayCargosAuxiliar, setarrayCargosAuxiliar] = useState([])
    const { Search } = Input;
    const { alertEliminarCargo } = AlertElinarCargo();
    const [getCargos, { loading }] = useLazyQuery(GET_ALL_CARGOS, {
        onCompleted: data => {
            if (data) {
                if (data.getAllCargos) {
                    setarrayCargos(data.getAllCargos)
                    setarrayCargosAuxiliar(data.getAllCargos)
                } else {
                    setarrayCargos([])
                    setarrayCargosAuxiliar([])
                }
            } else {
                setarrayCargos([])
                setarrayCargosAuxiliar([])
            }
        }
    })
    const buscar = (e) => {
        if (e === "") {
            setarrayCargos(arrayCargosAuxiliar)
            return
        }
        const auxiliar = arrayCargosAuxiliar.filter((cargo) => {
            return cargo.nombre_cargo.toLowerCase().includes(e.toLowerCase())
        })
        setarrayCargos(auxiliar)
    }

    useEffect(() => {
        try {
            getCargos({
                variables: {
                    key: Math.random()
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }, [actualizarTabla])


    const columns = [{
        title: "#",
        dataIndex: "key",
        name: "key",
    }, {
        title: "Nombre cargo",
        dataIndex: "nombre_cargo",
        name: "nombre_cargo"
    }, {
        title: "Opciones",
        dataIndex: "opciones",
        name: "opciones"
    }
    ]

    const crearFila = (cargo, key) => {
        return {
            key: key + 1,
            nombre_cargo: cargo.nombre_cargo,
            opciones: <span style={{ color: 'red' }} > <DeleteOutlined onClick={() => alertEliminarCargo(cargo.id_cargo, setActualizarTabla)} className="seleccionarComponente" /></span>
        }
    }

    return (
        <>
            <div className='row' >
                <div className='col-md-6 col-sm-12' >
                    <Search style={{ width: "60%" }} placeholder="Ingresa el cargo" enterButton onSearch={buscar} allowClear />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setverModalNuevoCargo(true)} >Agregar cargo</Button>
                </div>
            </div>
            <div className='table-responsive' >
                <Table className='pt-5' columns={columns} dataSource={arrayCargos.length > 0 ? arrayCargos.map((cargo, key) => {
                    return crearFila(cargo, key)
                }) : []} />
            </div>
            <ModalAgregarCargo setVerModal={setverModalNuevoCargo} verModal={verModalNuevoCargo} setActualizarTabla={setActualizarTabla} />
        </>
    )
}

export default Cargo