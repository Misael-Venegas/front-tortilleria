import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery, gql } from '@apollo/client'
import { Button, Input } from 'antd'
import TablaTipoAlmacen from './TablaTipoAlmacen'
import ModalAgregar from './ModalAgregar'

const GET_ALMACEN_TIPO = gql`
  query getAlmacenTipo{
    getAlmacenTipo{
      id_tipo_almacen
      nombre
    }
  }
`

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)
    const [obtenerAlmacenTipo, { data, loading }] = useLazyQuery(GET_ALMACEN_TIPO,
        {
            onCompleted: (data) => {
                data ? setArrayAlmacen(data.getAlmacenTipo) : setArrayAlmacen([])
            }
        }
    );
    const [arrayAlmacen, setArrayAlmacen] = useState([]);

    const buscar = (e) => {
        const busqueda = arrayAlmacen.filter(function (almacen) {
            return almacen.nombre.toLowerCase().includes(e.toLowerCase());
        });
        if (busqueda.length > 0) {
            setArrayAlmacen(busqueda);
        } else {
            setArrayAlmacen(data.getAlmacenTipo);
        }
    }

    useEffect(() => {
        obtenerAlmacenTipo()
    }, [])

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del tipo de almacén" onSearch={buscar} enterButton allowClear />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Tipo Almacén</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaTipoAlmacen data={arrayAlmacen} loading={loading} sqlGet={GET_ALMACEN_TIPO}/>
            </div>
            <ModalAgregar  setVerModal={setVerModal} verModal={verModal} sqlGet={GET_ALMACEN_TIPO}/>
        </>
    )
}

export default Formulario