
import PanelVenta from "./PanelVenta";
import TblVentas from "./TblVentas";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Button, message, Tag } from "antd";
const SAVE_VENTA = gql`
    mutation agregarVenta($input: ventasInput! ){
        agregarVenta(input: $input )
    }
`
const Ventas = () => {

    const [arrayVentas, setArrayVentas] = useState([])
    const [ventas, setVentas] = useState(0)
    const [arrayGVentas, setArrayGVentas] = useState([])
    const [guardarVenta, { data: dataVentas, loading: loadingVenta, error: errorVenta }] = useMutation(SAVE_VENTA)
    const realizarVenta = async () => {
        console.log(arrayGVentas)
        try {
            await guardarVenta({
                variables: {
                    input: {
                        key: Math.random(),
                        productos: arrayGVentas
                    }
                }
            })
            message.success("Los datos se guardaron de manera correcta")
            limpiarCampos()
        } catch (error) {
            message.error(error.message)
        }

    }

    const limpiarCampos = () => {
        setVentas(0)
        setArrayGVentas([])
        setArrayVentas([])
    }
    return (
        <>

            <div className="row  pb-5"  >
                <div className="col-md-8 col-sm-12" >
                    <Tag color="cyan" >Le atiende: 1 Misael Nava Venegas </Tag>
                </div>
                <div className="col-md-4 col-sm-12" >
                    <Tag color="green" className="float-right mr-3">{new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}</Tag>
                </div>
            </div>
            <PanelVenta setArrayVentas={setArrayVentas} arrayVentas={arrayVentas} setVentas={setVentas}
                ventas={ventas} setArrayGVentas={setArrayGVentas} arrayGVentas={arrayGVentas}
            />
            <TblVentas arrayVentas={arrayVentas} ventas={ventas} setArrayVentas={setArrayVentas}
                arrayGVentas={arrayGVentas} setArrayGVentas={setArrayGVentas} setVentas={setVentas}
            />

            <div className='row' >
                <div className='col'>
                    <div className='float-right pt-4' >
                        <Button className='mr-3' type="primary" onClick={limpiarCampos} danger >Cancelar</Button>
                        <Button className='mr-3' style={{ backgroundColor: 'green', color: "white" }} onClick={realizarVenta}>Cobrar</Button>
                    </div>
                </div>

            </div>


        </>

    );
};

export default Ventas;