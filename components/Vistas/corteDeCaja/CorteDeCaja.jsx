import React, { useState, useEffect } from 'react'
import { DatePicker, Button, message, Alert, Select, TimePicker } from 'antd'
import TextoCorteDeCaja from './TextoCorteDeCaja'
import { useLazyQuery, gql } from '@apollo/client'

const GET_ALL_SUCUARSALES = gql`
        query getAllSucursales($key: Float!){
             getAllSucursales(key: $key){
                id_sucursal
                nombre
             }
             }
`
const CREATE_CORTE = gql`
        query generarCorteDeCaja($fechaCorte: String!, $id_sucursal: String!, $horaInicio: String!, $horaFin: String! ){
              generarCorteDeCaja(fechaCorte: $fechaCorte, id_sucursal: $id_sucursal,horaInicio : $horaInicio, horaFin: $horaFin){
                id_ventas_productos
                nombre_sucursal
                nombre_producto
                cantidad
                total
                empleado
                hora_venta
              }
        }
`

const CorteDeCaja = () => {
    const { Option } = Select;
    const [arrayCorte, setArrayCorte] = useState([])
    const [sucursal, setsucursal] = useState("")
    const [arraySucursal, setarraySucursales] = useState([])
    const [generarCorteDeCaja, { loading }] = useLazyQuery(CREATE_CORTE, {
        onCompleted: data => {
            console.log(data)
            data ? (data.generarCorteDeCaja ? setArrayCorte(data.generarCorteDeCaja) : setArrayCorte([])) : setArrayCorte([])
        }
    })

    const [obtenerSucursales, { loading: loadingSucursales }] = useLazyQuery(GET_ALL_SUCUARSALES, {
        onCompleted: (data) => {
            data ? (data.getAllSucursales ? setarraySucursales(data.getAllSucursales) : setarraySucursales([])) : setarraySucursales([])
        }
    })
    const [fecha, setFecha] = useState("")
    const [horaInicio, sethoraInicio] = useState("")
    const [horaFin, sethoraFin] = useState("")
    const consultarCorteDeCaja = async () => {
        if (fecha === "") {
            message.error("Seleccione una fecha para generar el corte de caja")
            return
        }
        try {
            generarCorteDeCaja({
                variables: {
                    fechaCorte: fecha,
                    id_sucursal: new String(sucursal),
                    horaInicio: horaInicio,
                    horaFin: horaFin
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }

    useEffect(() => {
        try {
            obtenerSucursales({
                variables: {
                    key: Math.random()
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }, [])
    const seleccionarSucursal = (e) => {
        if (e === "") {
            setsucursal("")
        } else {
            setsucursal(e)
        }
    }
    return (
        <>
            <div className='row' >
                <div className='col-md-2 col-sm-12 ' >
                    <span>Fecha</span>
                    <DatePicker style={{ width: "100%" }} onChange={(e, date) => setFecha(date)} />
                </div>
                <div className='col-md-2 col-sm-12' >
                    <span>Sucursal</span>
                    <Select style={{ width: "100%" }} loading={loading} onChange={seleccionarSucursal} placeholder="Sucursal" >
                        <Option value="" >Todas</Option>
                        {
                            arraySucursal ? arraySucursal.map((sucursal, key) =>
                                <Option key={key} value={sucursal.id_sucursal} >
                                    {sucursal.nombre}
                                </Option>
                            ) : []
                        }
                    </Select>
                </div>
                <div className='col-md-2 col-sm-12' >
                    <span>Hora inicio</span>
                    <TimePicker style={{ width: "100%" }} onChange={(e, hora) => sethoraInicio(hora)} format={"HH:mm"} />
                </div>
                <div className='col-md-2 col-sm-12' >
                    <span>Hora fin</span>
                    <TimePicker style={{ width: "100%" }} onChange={(e, hora) => sethoraFin(hora)} format={"HH:mm"} />
                </div>
                <div className='col-md-2 col-sm-12' >

                    <Button type='primary' onClick={consultarCorteDeCaja} style={{ marginTop: 20 }} >Generar corte de caja</Button>
                </div>
            </div>

            <div className='row' >
                <div className='col-md-12' >
                    {
                        arrayCorte.length > 0 && <TextoCorteDeCaja arrayCorte={arrayCorte} fecha={fecha} />
                    }
                    {
                        arrayCorte.length <= 0 && <Alert className='mt-5' type='warning' message="No hay resultados para la fecha seleccionada" showIcon />
                    }

                </div>
            </div>
        </>
    )
}

export default CorteDeCaja