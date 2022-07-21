import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Button, Input } from 'antd'
import TablaEntradas from './TablaEntradas'
import ModalAgregar from './ModalAgregar'

const GET_ENTRADAS = gql`
  query getEntradas{
    getEntradas{
        id_entrada 
        id_entradas_almacen 
        descripcion
        cantidad
        tipo_almacen
        fecha
        nombre
        id_insumos
        id_proveedor
        id_almacen
    }
  }
`

const Formulario = () => {
    const [verModal, setVerModal] = useState(false);
    const [datosEditar, setDatosEditar] = useState(null);
    const [arrayDatos, setArrayDatos] = useState([]);
    const [obtenerEntradas, { data, loading }] = useLazyQuery(GET_ENTRADAS,
        {
            onCompleted: (data) => {
                data ? setArrayDatos(data.getEntradas) : setArrayDatos([])
            }
        }
    );

    const buscar = (entradaTexto) => {
        if (entradaTexto) {
            const busqueda = arrayDatos.filter((entradas) =>
                entradas.descripcion.toLowerCase().indexOf(entradaTexto.toLowerCase()) > -1
            );
            if (busqueda.length > 0) {
                setArrayDatos(busqueda);
            } else {
                setArrayDatos(data.getEntradas);
            }
        } else {
            setArrayDatos(data.getEntradas);
        }
    }

    useEffect(() => {
        obtenerEntradas();
    }, [])

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del producto" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Nueva Entrada</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaEntradas data={arrayDatos} sqlGet={GET_ENTRADAS}  setDatosEditar={setDatosEditar} setVerModal={setVerModal}/>
            </div>
            <ModalAgregar  setVerModal={setVerModal} verModal={verModal} sqlGet={GET_ENTRADAS} datosEditar={datosEditar} setDatosEditar={setDatosEditar}/>
        </>
    )
}

export default Formulario