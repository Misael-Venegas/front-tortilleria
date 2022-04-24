import react from "react";
import Container from "../principal/Container";

const Ventas = () => {

    return (
        <Container>
            <div class="form-row">
                <div class="col">
                    <label for="inputEtiqueta">Le atiende</label>
                </div>
                <div class="col">
                    <input type="text" id="txtTipo" className="form-control" readOnly />
                </div>
                <div class="col-4">
                    <input type="text" id="txtNombre" className="form-control" readOnly />
                </div>
                <div class="col-md-2 offset-md-4" >
                    <label for="inputFecha">aqui va la fecha</label>
                </div>
            </div>

            <div className="form-row">
                <div className="col-8">
                    <div className="p-5 border bg-light">
                    <div class="form-inline form-inline">
                         <label>Producto</label>
                            <select id="inputState" class="form-control">
                                <option selected>Selecciona...</option>
                                <option id="1">Masa</option>
                                <option id="2">Tortillas</option>
                            </select>
                        <div class="form-check form-check-inline" >
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"></input>
                            <label class="form-check-label" for="inlineCheckbox1">A Granel</label>

                            <label>Cantidad</label>
                        </div>
                        </div>

                    </div>
                </div>
            </div>

        </Container>
    );
};

export default Ventas;