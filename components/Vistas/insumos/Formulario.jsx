import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Button, Input } from 'antd'
import TablasInsumos from './TablaInsumos'
import ModalAgregar from './ModalAgregar'

const GET_INSUMOS = gql`
  query getInsumos{
    getInsumos{
        id_insumos
        descripcion
        unidad_medida
        id_tipo_almacen
        tipo_almacen
    }
  }
`

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)
    const [obtenerInsumos, { data, loading }] = useLazyQuery(GET_INSUMOS,
        {
            onCompleted: (data) => {
                data ? setArrayInsumos(data.getInsumos) : setArrayInsumos([])
            }
        }
    );
    const [arrayInsumos, setArrayInsumos] = useState([]);
    const [datosEditar, setDatosEditar] = useState(null)

    const buscar = (entradaTexto) => {
        if (entradaTexto) {
            const busqueda = arrayInsumos.filter((insumo) =>
                insumo.descripcion.toLowerCase().indexOf(entradaTexto.toLowerCase()) > -1
            );
            if (busqueda.length > 0) {
                setArrayInsumos(busqueda);
            } else {
                setArrayInsumos(data.getInsumos);
            }
        } else {
            setArrayInsumos(data.getInsumos);
        }
    }

    useEffect(() => {
        obtenerInsumos()
    }, [])


    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del insumo" onSearch={buscar} enterButton allowClear />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Insumo</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablasInsumos data={arrayInsumos} sqlGet={GET_INSUMOS} setDatosEditar={setDatosEditar} setVerModal={setVerModal} />
            </div>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} sqlGet={GET_INSUMOS} data={datosEditar} setDatosEditar={setDatosEditar} />
        </>
    )
}

export default Formulario