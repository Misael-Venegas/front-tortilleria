
import Container from "../principal/Container";
import PanelVenta from "./PanelVenta";
import TblVentas from "./TblVentas";
import { useState } from "react";
const Ventas = () => {

    const [arrayVentas, setArrayVentas] = useState([])
    const [ventas, setVentas] = useState(0)
    return (
        <>
            <Container>
                <div className="row  pb-5"  >
                    <div className="col-md-8 col-sm-12" >
                        <span className="ml-3" >Le atiende: 1 Misael Nava Venegas </span>
                    </div>
                    <div className="col-md-4 col-sm-12" >
                        <span className="float-right mr-3">{new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
                <PanelVenta setArrayVentas={setArrayVentas} arrayVentas={arrayVentas} setVentas={setVentas}
                    ventas={ventas} />
                <TblVentas arrayVentas={arrayVentas} ventas={ventas} />
            </Container>
        </>

    );
};

export default Ventas;