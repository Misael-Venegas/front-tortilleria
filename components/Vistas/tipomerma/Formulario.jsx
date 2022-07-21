import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery, gql } from '@apollo/client'
import { Button, Input } from 'antd'
import TablaMermas from './TablaMermas'
import ModalAgregar from './ModalAgregar'

const GET_MERMA_TIPO = gql`
  query getTipoMermas{
    getTipoMermas{
      id_tipo_merma
      tipo
    }
  }
`

const Formulario = () => {
    const [verModal, setVerModal] = useState(false);
    const [arrayMerma, setArrayMermas] = useState([]);
    const [obtenerMermaTipo, { data, loading }] = useLazyQuery(GET_MERMA_TIPO,
        {
            onCompleted: (data) => {
                data ? setArrayMermas(data.getTipoMermas) : setArrayMermas([])
            }
        }
    );

    const buscar = (entradaTexto) => {
        if (entradaTexto) {
            const busqueda = arrayMerma.filter((merma) =>
                merma.tipo.toLowerCase().indexOf(entradaTexto.toLowerCase()) > -1
            );
            if (busqueda.length > 0) {
                setArrayMermas(busqueda);
            } else {
                setArrayMermas(data.getTipoMermas);
            }
        } else {
            setArrayMermas(data.getTipoMermas);
        }
    }

    useEffect(() => {
        obtenerMermaTipo()
    }, [])

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del tipo de merma" onSearch={buscar} />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModal(true)} >Agregar Tipo de Merma</Button>
                </div>
            </div>
            <div className='table-responsive'>
                <TablaMermas data={arrayMerma} sqlGet={GET_MERMA_TIPO} />
            </div>
            <ModalAgregar setVerModal={setVerModal} verModal={verModal} sqlGet={GET_MERMA_TIPO} />
        </>
    )
}

export default Formulario