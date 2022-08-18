import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Button, Input, Select, DatePicker, message } from 'antd'
import TablaMermas from './TablaMermas'
import ModalAgregar from './ModalAgregar'

const GET_ALL_SUCUARSALES = gql`
        query getAllSucursales($key: Float!){
             getAllSucursales(key: $key){
                id_sucursal
                nombre
       
             }
             }
`

const GET_MERMAS = gql`
  query getMermas($fecha: String!, $id_sucursal: String!){
    getMermas ( fecha: $fecha, id_sucursal: $id_sucursal ){
        id_merma
        cantidad
        id_tipo_merma
        id_sucursal
        tipo_merma
        sucursal
        fecha_registro
    }
  }
`

const Formulario = () => {
    const { Option } = Select
    const [verModal, setVerModal] = useState(false)
    const [arrayDatos, setArrayDatos] = useState([]);
    const [idSucursal, setidSucursal] = useState("")
    const [fecha, setfecha] = useState(new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice("-2") + "-" + ("0" + new Date().getDate()).slice("-2"))
    const [actualizarTabla, setactualizarTabla] = useState(3.1416)

    const [obtenerMermas, { data, loading }] = useLazyQuery(GET_MERMAS,
        {
            onCompleted: (data) => {
                console.log(data)
                data ? setArrayDatos(data.getMermas) : setArrayDatos([]);
            }
        }
    );

    const [arraySucursales, setarraySucursales] = useState([])

    const [obtenerSucursales, { loading: loadingSucursal }] = useLazyQuery(GET_ALL_SUCUARSALES, {
        onCompleted: data => {
            console.log(data)
            data ? (data.getAllSucursales ? setarraySucursales(data.getAllSucursales) : setarraySucursales([])) : setarraySucursales([])
        }
    })

    const buscar = (entradaTexto) => {
        if (entradaTexto) {
            const busqueda = arrayDatos.filter((merma) =>
                merma.tipo_merma.toLowerCase().indexOf(entradaTexto.toLowerCase()) > -1
            );
            if (busqueda.length > 0) {
                setArrayDatos(busqueda);
            } else {
                setArrayDatos(data.getMermas);
            }
        } else {
            setArrayDatos(data.getMermas);
        }
    }

    const consultarSucursles = async () => {
        try {
            await obtenerSucursales({
                variables: {
                    key: Math.random()
                }
            })
        } catch (error) {
            message.error(error.message)
        }
    }



    useEffect(() => {
        //console.log(fecha, idSucursal)
        obtenerMermas({
            variables: {
                fecha,
                id_sucursal: "" + idSucursal
            }
        });
    }, [actualizarTabla])

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre de la merma" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Merma</Button>
                </div>
            </div>
            <div className='row pt-3 ' >
                <div className='col-md-3 col-sm-12' >
                    <span>Fecha</span>
                    <DatePicker style={{ width: "100%" }} onChange={(e, fecha) => setfecha(fecha)} />
                </div>
                <div className='col-md-3 col-sm-12' >
                    <span>Sucursal</span>
                    <Select onClick={() => consultarSucursles()} loading={loadingSucursal} style={{ width: "100%" }} onChange={(e) => setidSucursal(e)} >
                        <Option value=""> Todas </Option>
                        {
                            arraySucursales ? arraySucursales.map((sucursal, key) => {
                                return <Option key={key} value={sucursal.id_sucursal} >
                                    {sucursal.nombre}
                                </Option>
                            }) : []
                        }
                    </Select>
                </div>

                <div className='col-md-3 col-sm-12' >
                    <Button type='primary' style={{ marginTop: 21 }} onClick={() => setactualizarTabla(Math.random())} >Filtrar datos </Button>
                </div>

            </div>
            <div className='table-responsive'>
                <TablaMermas data={arrayDatos} sqlGet={GET_MERMAS} />
            </div>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} sqlGet={GET_MERMAS} />
        </>
    )
}

export default Formulario