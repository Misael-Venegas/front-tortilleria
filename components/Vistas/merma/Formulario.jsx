import React, { useState, useEffect } from 'react'
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { Button, Input } from 'antd'
import TablaMermas from './TablaMermas'
import ModalAgregar from './ModalAgregar'

const GET_MERMAS = gql`
  query getMermas{
    getMermas{
        id_merma
        cantidad
        id_tipo_merma
        id_sucursal
        tipo_merma
        sucursal
    }
  }
`

const Formulario = () => {
    const [verModal, setVerModal] = useState(false)
    const [datosEditar, setDatosEditar] = useState(null)
    const [arrayDatos, setArrayDatos] = useState([]);
    const [obtenerMermas, { data, loading }] = useLazyQuery(GET_MERMAS,
        {
            onCompleted: (data) => {
                data ? setArrayDatos(data.getMermas) : setArrayDatos([]);
            }
        }
    );
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

    useEffect(() => {
        obtenerMermas();
    }, [])

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
            <div className='table-responsive'>
                <TablaMermas data={arrayDatos} sqlGet={GET_MERMAS}/>
            </div>
            <ModalAgregar  setVerModal={setVerModal} verModal={verModal} sqlGet={GET_MERMAS} />
        </>
    )
}

export default Formulario