import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd'
import TablProductos from './TablProductos'
import ModalAgregarProducto from './ModalAgregarProducto'
import { useLazyQuery, gql } from '@apollo/client'

const GET_ALL_PRODUCTOS = gql`
      query getProductos($key: Float!){
            getProductos(key: $key){
                id_producto
                nombre
            }
      }
`

const Productos = () => {
    const { Search } = Input
    const [verModalAgregarProductos, setVerModalAgregarProductos] = useState(false)
    const [arrayProductos, setarrayProductos] = useState([])
    const [auxiliarArrayProductos, setauxiliarArrayProductos] = useState([])
    const [actuaizarTabla, setactuaizarTabla] = useState(3.1406)
    const [get_usuarios, { loading }] = useLazyQuery(GET_ALL_PRODUCTOS, {
        onCompleted: data => {
            if (data) {
                if (data.getProductos) {
                    setarrayProductos(data.getProductos)
                    setauxiliarArrayProductos(data.getProductos)
                } else {
                    setarrayProductos([])
                    setauxiliarArrayProductos([])
                }
            } else {
                setarrayProductos([])
                setauxiliarArrayProductos([])
            }
        }
    })
    useEffect(() => {
        get_usuarios({
            variables: {
                key: Math.random()
            }
        })
    }, [actuaizarTabla])

    const buscarProducto = (e) => {
        if (e === "") {
            setarrayProductos(auxiliarArrayProductos)
            return
        }
        const auxiliar = auxiliarArrayProductos.filter((producto) => {
            return producto.nombre.toLowerCase().includes(e.toLowerCase())

        })

        setarrayProductos(auxiliar)
    }

    return (
        <>
            <div className='row' >
                <div className='col-md-4 col-sm-12' >
                    <Search enterButton placeholder='Ingresa el nombre del producto' className='mt-2' onSearch={buscarProducto} allowClear />
                </div>

                <div className='col-md-8 col-sm-12' >
                    <Button type='primary' className='float-right mt-2' onClick={() => setVerModalAgregarProductos(true)}  >
                        Agregar producto
                    </Button>
                </div>
            </div>

            <TablProductos arrayProductos={arrayProductos} setactuaizarTabla={setactuaizarTabla} />
            <ModalAgregarProducto verModalAgregarProductos={verModalAgregarProductos} setVerModalAgregarProductos={setVerModalAgregarProductos} setactuaizarTabla={setactuaizarTabla} />
        </>
    )
}

export default Productos