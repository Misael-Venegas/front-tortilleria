
import Container from "../principal/Container";
import PanelVenta from "./PanelVenta";
import TblVentas from "./TblVentas";
import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Message from '../globales/Message'
import SuccesMessage from '../globales/SuccesMessage'
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
    const [mensaje, setmensaje] = useState("")
    const [mensajeError, setmensajeError] = useState(false)
    const [mensajeSucces, setmensajeSucces] = useState(false)
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
            setmensaje("Los datos se guardaron de manera correcta")
            setmensajeSucces(true)
            setTimeout(() => {
                setmensajeSucces(false)
            }, 2000);
            limpiarCampos()
        } catch (error) {
            setmensaje(error.message)
            setmensajeError(true)
            setTimeout(() => {
                setmensajeError(false)
            }, 2000);
        }

    }

    const limpiarCampos = () => {
        setVentas(0)
        setArrayGVentas([])
        setArrayVentas([])
    }
    return (
        <>
            <Container>
                {
                    mensajeError && <Message msg={mensaje} />
                }
                {
                    mensajeSucces && <SuccesMessage meg={mensaje} />
                }
                <div className="row  pb-5"  >
                    <div className="col-md-8 col-sm-12" >
                        <span className="ml-3" >Le atiende: 1 Misael Nava Venegas </span>
                    </div>
                    <div className="col-md-4 col-sm-12" >
                        <span className="float-right mr-3">{new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
                <PanelVenta setArrayVentas={setArrayVentas} arrayVentas={arrayVentas} setVentas={setVentas}
                    ventas={ventas} setArrayGVentas={setArrayGVentas} arrayGVentas={arrayGVentas}
                    setmensaje={setmensaje} setmensajeError={setmensajeError}
                />
                <TblVentas arrayVentas={arrayVentas} ventas={ventas} setArrayVentas={setArrayVentas}
                    arrayGVentas={arrayGVentas} setArrayGVentas={setArrayGVentas} setVentas={setVentas}
                />

                <div className='row' >
                    <div className='col'>
                        <div className='float-right pt-4' >
                            <button className='btn btn-danger mr-3' onClick={limpiarCampos}  >Cancelar</button>
                            <button className='btn btn-success' onClick={realizarVenta}>Cobrar</button>
                        </div>
                    </div>

                </div>

            </Container>
        </>

    );
};

export default Ventas;