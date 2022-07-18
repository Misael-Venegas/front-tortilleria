import { gql, useLazyQuery } from '@apollo/client';
import { Select, message } from 'antd';
import react, { useState, useEffect } from 'react';

const GET_ALL_SUCUARSALES = gql`
        query getAllSucursales($key: Float!){
             getAllSucursales(key: $key){
                id_sucursal
                nombre
             }
             }
`

const SelectSucurslaes = ({ setsucursal }) => {
    const { Option } = Select;
    const [arraySucursal, setarraySucursales] = useState([])
    const [obtenerSucursales, { loading }] = useLazyQuery(GET_ALL_SUCUARSALES, {
        onCompleted: (data) => {
            console.log(data)
            data ? (data.getAllSucursales ? setarraySucursales(data.getAllSucursales) : setarraySucursales([])) : setarraySucursales([])
        }
    })

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


    return (
        <div className='pt-3' >
            <span>Sucursal</span>
            <Select style={{ width: "100%" }} loading={loading} onChange={(e) => setsucursal(e)} >
                {
                    arraySucursal ? arraySucursal.map((sucursal, key) =>
                        <Option key={key} value={sucursal.id_sucursal} >
                            {sucursal.nombre}
                        </Option>
                    ) : []
                }
            </Select>
        </div>
    )
}

export default SelectSucurslaes