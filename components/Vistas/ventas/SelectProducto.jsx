import React, { useEffect, useState } from 'react'
import { message, Select } from 'antd'
import { useLazyQuery, gql } from '@apollo/client'

const GET_ALL_PRODUCTOS = gql`
      query getProductos($key: Float!){
            getProductos(key: $key){
                id_producto
                nombre
            }
      }
`


const SelectProducto = ({ setproducto, arrayProductos, setarrayProductos }) => {


    const [get_usuarios, { loading }] = useLazyQuery(GET_ALL_PRODUCTOS, {
        onCompleted: data => {
            data ? (data.getProductos ? setarrayProductos(data.getProductos) : []) : setarrayProductos([])
        }
    })
    useEffect(() => {
        get_usuarios({
            variables: {
                key: Math.random()
            }
        })
    }, [])

    const { Option } = Select;

    const actualizarSelect = () => {
        try {
            get_usuarios({
                variables: {
                    key: Math.random()
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }

    return <Select loading={loading} style={{ width: "100%" }} onChange={(e) => setproducto(e)} onClick={() => actualizarSelect()} >
        {
            arrayProductos.map((producto, key) => (
                <Option key={key} value={producto.id_producto} > {producto.nombre} </Option>
            ))
        }
    </Select>
}

export default SelectProducto