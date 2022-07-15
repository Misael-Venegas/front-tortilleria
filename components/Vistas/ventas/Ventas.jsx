import { useEffect, useState } from 'react'
import { Tag } from 'antd'
import { ObtnerDatosUsuario } from '../../globales/DecodificarToken'
import SelectSucurslaes from './SelectSucurslaes';
import SelectProducto from './SelectProducto';
import { Input, Button } from 'antd';
import TablaVentas from './TablaVentas';
const Ventas = () => {
    const { obtnerDatosUsuario } = ObtnerDatosUsuario();
    const [nombreUsuario, setNombreUsuario] = useState("")
    useEffect(() => {
        setNombreUsuario(obtnerDatosUsuario())
    }, [])


    return (
        <>
            <div className='row' >
                <div className='col-12' >
                    <Tag color='cyan' >Empleado en turno: {nombreUsuario} </Tag>
                </div>
            </div>

            <div className='row' >
                <div className='col-md-4 col-sm-12' >
                    <SelectSucurslaes />
                </div>
            </div>
            <br />
            <div className='row' >
                <div className='col-md-3 col-sm-12' >
                    <span>Producto</span>
                    <SelectProducto />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <span>Cantidad</span>
                    <Input type='number' />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <span>Precio</span>
                    <Input type='number' />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <br />
                    <Button type='primary' >Agregar</Button>
                </div>
            </div>

            <TablaVentas />
            <div className='row' >
                <div className='col-12' >
                    <h4 className='float-right pt-3' >Total de venta: $ 4500.00</h4>
                </div>
            </div>
            <Button className='float-right' type='primary' > Realizar venta </Button>
        </>
    )
}

export default Ventas