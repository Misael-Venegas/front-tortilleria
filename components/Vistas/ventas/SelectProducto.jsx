import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
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

    
    const [get_productos, { loading }] = useLazyQuery(GET_ALL_PRODUCTOS, {
        onCompleted: data => {
            data ? (data.getProductos ? setarrayProductos(data.getProductos) : []) : setarrayProductos([])
        }
    })
    useEffect(() => {
        get_productos({
            variables: {
                key: Math.random()
            }
        })
    }, [])


    const { Option } = Select;

    return <Select loading={loading} style={{ width: "100%" }} onChange={(e) => setproducto(e)} >
        {
            arrayProductos.map((producto, key) => (
                <Option key={key} value={producto.id_producto} > {producto.nombre} </Option>
            ))
        }
    </Select>
}

export default SelectProducto