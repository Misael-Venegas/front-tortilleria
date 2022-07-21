import React, { useState, useEffect } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import { Button, Input } from 'antd'
import ModalAgregarProveedor from './ModalAgregarProveedor'
import TablaProveedores from './TablaProveedores'
import ModalEditarProveedor from './ModalEditarProveedor'

const GET_PROOVEDORES = gql`
  query getProveedores{
    getProveedores{
      id_proveedor
      nombre
      correo
      telefono
    }
  }
`

const Formulario = () => {
    const [verModalAgregarProveedor, setVerModalAgregarProveedor] = useState(false)
    const [verModalEditar, setVerModalEditar] = useState(false)
    const [obtenerProveedores, { data, loading }] = useLazyQuery(GET_PROOVEDORES,
        {
            onCompleted: (data) => {
                data ? setArrayProveedores(data.getProveedores) : setArrayProveedores([])
            }
        }
    );
    const [arrayProveedores, setArrayProveedores] = useState([]);
    const [provedorDatos, setProvedorDatos] = useState(null)

    useEffect(() => {
        obtenerProveedores()
    }, [])

    const buscar = (entradaTexto) => {
        if (entradaTexto) {
            const busqueda = arrayProveedores.filter((pro) =>
            pro.nombre.toLowerCase().indexOf(entradaTexto.toLowerCase()) > -1
            );
            if (busqueda.length > 0) {
                setArrayProveedores(busqueda);
            } else {
                setArrayProveedores(data.getProveedores);
            }
        } else {
            setArrayProveedores(data.getProveedores);
        }
    }

    return (
        <>
            <div className='row'>
                <div className='col-md-6 col-sm-12' >
                    <Input.Search style={{ width: "60%" }} placeholder="Ingrese el nombre del Proveedor" onSearch={buscar} enterButton allowClear />
                </div>
                <div className='col-md-6 col-sm-12' >
                    <Button type='primary' className='float-right' onClick={() => setVerModalAgregarProveedor(true)} >Agregar Proveedor</Button>
                </div>
            </div>
            <div className='table-responsive'>
                {<TablaProveedores data={arrayProveedores} loading={loading} sqlGetProveedores={GET_PROOVEDORES} setProvedorDatos={setProvedorDatos} setVerModalEditar={setVerModalEditar}/>}
            </div>
            <ModalAgregarProveedor setVerModal={setVerModalAgregarProveedor} verModal={verModalAgregarProveedor} sqlGetProveedores={GET_PROOVEDORES} />
            <ModalEditarProveedor verModalEditar={verModalEditar} setVerModalEditar={setVerModalEditar} data={provedorDatos} sqlGetProveedores={GET_PROOVEDORES}/>
        </>
    )
}

export default Formulario