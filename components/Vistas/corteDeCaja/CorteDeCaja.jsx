import React, { useState } from 'react'
import { DatePicker, Button, message, Alert } from 'antd'
import TextoCorteDeCaja from './TextoCorteDeCaja'
import { useLazyQuery, gql } from '@apollo/client'

const CREATE_CORTE = gql`
        query generarCorteDeCaja($fechaCorte: String! ){
              generarCorteDeCaja(fechaCorte: $fechaCorte){
                id_ventas_productos
                nombre_sucursal
                nombre_producto
                cantidad
                total
                empleado
              }
        }
`

const CorteDeCaja = () => {
    const [arrayCorte, setArrayCorte] = useState([])
    const [generarCorteDeCaja, { loading }] = useLazyQuery(CREATE_CORTE, {
        onCompleted: data => {
            console.log(data)
            data ? (data.generarCorteDeCaja ? setArrayCorte(data.generarCorteDeCaja) : setArrayCorte([])) : setArrayCorte([])
        }
    })
    const [fecha, setFecha] = useState("")
    const consultarCorteDeCaja = async () => {
        if (fecha === "") {
            message.error("Seleccione una fecha para generar el corte de caja")
            return
        }
        try {
            generarCorteDeCaja({
                variables: {
                    fechaCorte: fecha
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }
    return (
        <>
            <div className='row' >
                <div className='col-md-3 col-sm-12 ' >
                    <DatePicker style={{ width: "100%" }} onChange={(e, date) => setFecha(date)} />
                </div>
                <div className='col-md-9 col-sm-12' >
                    <Button type='primary' onClick={consultarCorteDeCaja} >Generar corte de caja</Button>
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