import { useEffect, useState } from 'react'
import { Tag } from 'antd'
import { ObtnerDatosUsuario } from '../../globales/DecodificarToken'
import SelectSucurslaes from './SelectSucurslaes';
import SelectProducto from './SelectProducto';
import { Input, Button } from 'antd';
import TablaVentas from './TablaVentas';
const Ventas = () => {
    const [arrayVentas, setarrayVentas] = useState([])
    const { obtnerDatosUsuario } = ObtnerDatosUsuario();
    const [sucursal, setsucursal] = useState("")
    const [producto, setproducto] = useState("")
    const [cantidad, setcantidad] = useState("")
    const [precio, setprecio] = useState("")
    const [nombreUsuario, setNombreUsuario] = useState("")
    useEffect(() => {
        setNombreUsuario(obtnerDatosUsuario())
    }, [])

    const crearListaDeVentas = () => {
        console.log("Vender", sucursal, producto, cantidad, precio)
    }

    return (
        <>
            <div className='row' >
                <div className='col-12' >
                    <Tag color='cyan' >Empleado en turno: {nombreUsuario} </Tag>
                </div>
            </div>

            <div className='row' >
                <div className='col-md-4 col-sm-12' >
                    <SelectSucurslaes setsucursal={setsucursal} />
                </div>
            </div>
            <br />
            <div className='row' >
                <div className='col-md-3 col-sm-12' >
                    <span>Producto</span>
                    <SelectProducto setproducto={setproducto} />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <span>Cantidad</span>
                    <Input type='number' onChange={(e) => setcantidad(e.target.value)} />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <span>Precio</span>
                    <Input type='number' onChange={(e) => setprecio(e.target.value)} />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <br />
                    <Button type='primary' onClick={() => crearListaDeVentas()} >Agregar</Button>
                </div>
            </div>

            <TablaVentas />
            <div className='row' >
                <div className='col-12' >
                    <h4 className='float-right pt-3' >Total de venta: $ 4500.00</h4>
                </div>
            </div>
            <Button className='float-right' type='primary'> Realizar venta </Button>
        </>
    )
}

export default Ventas