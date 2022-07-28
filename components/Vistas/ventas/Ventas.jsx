import { useEffect, useState } from 'react'
import { message, Tag, Select } from 'antd'
import { ObtnerDatosUsuario } from '../../globales/DecodificarToken'
import SelectSucurslaes from './SelectSucurslaes';
import SelectProducto from './SelectProducto';
import { Input, Button } from 'antd';
import TablaVentas from './TablaVentas';
import { useMutation, gql, useLazyQuery } from '@apollo/client';



const GUARDAR_VENTAS = gql`
    mutation agregarVenta($input: ventasInput!, $id_epleado: String!){
             agregarVenta(input: $input, id_epleado: $id_epleado)
    }
`
const GET_USUARIOS = gql`
      query getUsuarios{
            getUsuarios {
                id_empleado
                nombre
                apellidoP
                apellidoM
                nombre_cargo
           }
      }
`

const Ventas = () => {
    const { Option } = Select
    const [arrayVentas, setarrayVentas] = useState([])
    const [arrayProductos, setarrayProductos] = useState([])
    const [totatlVentas, settotatlVentas] = useState(0)
    const { obtnerDatosUsuario } = ObtnerDatosUsuario();
    const [sucursal, setsucursal] = useState("")
    const [producto, setproducto] = useState("")
    const [cantidad, setcantidad] = useState("")
    const [precio, setprecio] = useState("")
    const [arrayEmpleado, setarrayEmpleado] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState("")
    const [idRepartidor, setidRepartidor] = useState("")
    const [guardarVenta, { loading }] = useMutation(GUARDAR_VENTAS)
    useEffect(() => {
        setNombreUsuario(obtnerDatosUsuario())
        obtenerUsuarios()
    }, [])

    const [obtenerUsuarios, { loading: loadinEmpleados }] = useLazyQuery(GET_USUARIOS, {
        onCompleted: (data) => {
            if (data) {
                if (data.getUsuarios) {
                    setarrayEmpleado(data.getUsuarios)
                } else {
                    setarrayEmpleado([])
                }
            } else {
                setarrayEmpleado([])
            }
            console.log(data)
        }
    })

    const crearListaDeVentas = () => {
        const venta = {
            id_sucursal: sucursal,
            id_producto: producto,
            precio: parseFloat(precio * cantidad),
            cantidad: parseInt(cantidad)
        }
        let suma = parseFloat(totatlVentas) + parseFloat(precio * cantidad);
        settotatlVentas(suma)

        setarrayVentas([...arrayVentas, venta])
    }

    const quitarProducto = (posicion) => {

        const array = arrayVentas.filter((venta, index) => {
            if (posicion !== index) {
                return venta
            } else {
                let resta = parseFloat(totatlVentas) - parseFloat(venta.precio * venta.cantidad)
                settotatlVentas(resta)
            }
        })

        setarrayVentas([...array])
    }

    const realizarVenta = async () => {
        if (arrayVentas.length == 0) {
            message.error("Lista de venta vacia")
            return
        }
        if (sucursal === "") {
            message.error("Seleccione una sucursal")
            return
        }
        try {
            await guardarVenta({
                variables: {
                    input: {
                        key: Math.random(),
                        productos: arrayVentas
                    },
                    id_epleado: new String(idRepartidor)
                }
            })
            message.success("Venta realizada")
         
            settotatlVentas(0)
            setarrayVentas([])
        } catch (error) {
            message.error(error.message)
        }
    }


    const agregarId = (e) => {
        setidRepartidor(e)
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
                <div className='col-md-4 col-sm-12' >
                    <div className='pt-3' >
                        <span>Repartidor</span>
                        <Select style={{ width: "100%" }} loading={loadinEmpleados} onChange={agregarId} >
                            <Option value="" ></Option>
                            {
                                arrayEmpleado.map((empleado, key) => {
                                    if (empleado.nombre_cargo === "Repartidor") {
                                        return <Option key={key} value={empleado.id_empleado} >
                                            {empleado.nombre + " " + empleado.apellidoP + " " + empleado.apellidoM}
                                        </Option>
                                    }
                                })
                            }
                        </Select>
                    </div>

                </div>
            </div>
            <br />
            <div className='row' >
                <div className='col-md-3 col-sm-12' >
                    <span>Producto</span>
                    <SelectProducto setproducto={setproducto} arrayProductos={arrayProductos} setarrayProductos={setarrayProductos} />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <span>Cantidad</span>
                    <Input type='number' onChange={(e) => setcantidad(e.target.value)} />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <span>Precio unitario</span>
                    <Input type='number' onChange={(e) => setprecio(e.target.value)} />
                </div>

                <div className='col-md-3 col-sm-12' >
                    <br />
                    <Button type='primary' onClick={() => crearListaDeVentas()} >Agregar</Button>
                </div>
            </div>

            <TablaVentas arrayVentas={arrayVentas} setarrayVentas={setarrayVentas} arrayProductos={arrayProductos} quitarProducto={quitarProducto} />
            <div className='row' >
                <div className='col-12' >
                    <h4 className='float-right pt-3' >Total de venta: $ {totatlVentas} </h4>
                </div>
            </div>
            <div className='row' >
                <div className='col-12' >
                    <Button className='float-right' type='primary' onClick={() => realizarVenta()} > Realizar venta </Button>
                </div>
            </div>
        </>
    )
}

export default Ventas