import React from "react";
import Container from "../principal/Container";

const AgregarUsuarios = () => {
  return (
    <Container>
      <form>
        <div className="form-row">
          <div className="col-4">
            <div className="p-3 border bg-light">
            <p>Nuevo Usuario</p>

              <input type="text" className="form-control" id="inputNombre" />
              <label for="inputName">Nombre</label>

              <input type="text" className="form-control" id="inputApellidoP"/>
              <label for="inputApellidoP">Apellido Paterno</label>

              <input type="text" className="form-control" id="inputApellidoM"/>
              <label for="inputApellidoM">Apelido Materno</label>

              <input type="text" className="form-control" id="inputTelefono"/>
              <label for="inputTelefono">Telefono</label>

              <input type="email" className="form-control" id="inputEmail"/>
              <label for="inputEmail">Email</label>

              <input type="password" className="form-control" id="inputPassword"/>
              <label for="inputPassword">Contrasena</label>

              <form>
                <div class="form-row">
                  <div class="col-2">
                    <input type="text" id="txtTipo" className="form-control" readOnly /></div>
                  <div class="col">
                    <select id="inputState" class="form-control">
                      <option selected>Selecciona...</option>
                      <option id="1">Administrador</option>
                      <option id="2">Cajero</option>
                      <option id="3">Repartidor</option>
                    </select>
                  </div>
                </div>
              </form>
              <label>Tipo</label>
              <form>
                <div class="form-row">
                  <div class="col">
                    <button type="submit" class="btn btn-primary ">Guardar</button>
                  </div>
                  <div class="col" >
                    <button type="submit" class="btn btn-primary">Eliminar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col">
            <div className="border bg-light">
              <table class="table table-striped">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default AgregarUsuarios;
