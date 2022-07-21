import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Button, Input } from 'antd'
import TablaAlmacen from './TablaAlmacen'
import ModalAgregar from './ModalAgregar'

const GET_ALMACEN = gql`
  query getAlmacen{
    getAlmacen{
        id_almacen
        cantidad
        id_insumos
        id_tipo_almacen
        id_sucursal
        nombreTipoAlmacen
        nombreSucursal
        nombreInsumo
    }
  }
`

const Formulario = () => {
    const [verModal, setVerModal] = useState(false);
    const [datosEditar, setDatosEditar] = useState(null)
    const [arrayAlmacen, setArrayAlmacen] = useState([]);
    const [obtenerAlmacen, { data, loading }] = useLazyQuery(GET_ALMACEN,
        {
            onCompleted: (data) => {
                data ? setArrayAlmacen(data.getAlmacen) : setArrayAlmacen([])
            }
        }
    );
    
    const buscar = (entradaTexto) => {
        if (entradaTexto) {
            const busqueda = arrayAlmacen.filter((insumo) =>
                insumo.nombreInsumo.toLowerCase().indexOf(entradaTexto.toLowerCase()) > -1
            );
            if (busqueda.length > 0) {
                setArrayAlmacen(busqueda);
            } else {
                setArrayAlmacen(data.getAlmacen);
            }
        } else {
            setArrayAlmacen(data.getAlmacen);
        }
    }

    useEffect(() => {
        obtenerAlmacen();
    }, [])
    

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del insumo" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Insumo al Almacén</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaAlmacen data={arrayAlmacen} sqlGet={GET_ALMACEN} setDatosEditar={setDatosEditar} setVerModal={setVerModal}/>
            </div>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} sqlGet={GET_ALMACEN} datosEditar={datosEditar} setDatosEditar={setDatosEditar} />
        </>
    )
}

export default Formulario