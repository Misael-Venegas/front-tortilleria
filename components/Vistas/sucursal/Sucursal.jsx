import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import TablaSucursal from './TablaSucursal';
import ModalAgregarSucursal from './ModalAgregarSucursal';
import { useLazyQuery, gql } from '@apollo/client';

const GET_ALL_SUCUARSALES = gql`
        query getAllSucursales($key: Float!){
             getAllSucursales(key: $key){
                id_sucursal
                nombre
                telefono
                direccion
             }
             }
`

const Sucursal = () => {
    const { Search } = Input;
    const [verModalAgregarSucursal, setVerModalAgregarProductos] = useState(false)
    const [actualizarTabla, setactualizarTabla] = useState(3.1416)
    const [arraySucursales, setarraySucursales] = useState([])
    const [arrayAuxiliarSucursales, setArrayAuxiliarSucursales] = useState([])
    const [obtenerSucursales, { loading }] = useLazyQuery(GET_ALL_SUCUARSALES, {
        onCompleted: data => {
            if (data) {
                if (data.getAllSucursales) {
                    setarraySucursales(data.getAllSucursales)
                    setArrayAuxiliarSucursales(data.getAllSucursales)
                } else {
                    setarraySucursales([])
                    setArrayAuxiliarSucursales([])
                }
            } else {
                setarraySucursales([])
                setArrayAuxiliarSucursales([])
            }
        }
    })

    useEffect(() => {
        obtenerSucursales({
            variables: {
                key: Math.random()
            }
        })
    }, [actualizarTabla])

    return (
        <>
            <div className='row' >
                <div className='col-md-4 col-sm-12 ' >
                    <Search placeholder='Ingresa el nombre de la sucursal' enterButton allowClear />
                </div>
                <div className='col-md-8 col-sm-12 ' >
                    <Button className='float-right' type='primary' onClick={() => setVerModalAgregarProductos(true)} >Agregar sucursal</Button>
                </div>
            </div>
            <ModalAgregarSucursal verModalAgregarSucursal={verModalAgregarSucursal} setVerModalAgregarProductos={setVerModalAgregarProductos} setactualizarTabla={setactualizarTabla} />
            <TablaSucursal loading={loading} arraySucursales={arraySucursales} setActualizarTabla={setactualizarTabla} />
        </>
    )
}

export default Sucursal