import React, { useEffect } from "react";
import Container from "../principal/Container";
import { useLazyQuery, gql } from "@apollo/client";

const OBTNER_USUARIOS = gql`
query getUsuarios {
  getUsuarios {
    id
    nombre
    apellidoP
    apellidoM
    telefono
    email
    password
    tipo
  }
}
`

const AgregarUsuarios = () => {

  const [perro, { data, loading, error }] = useLazyQuery(OBTNER_USUARIOS)

  useEffect(() => {

    try {
      perro()
    } catch (error) {
      console.log(error.message);
    }


  }, [])

  console.log(data);

  return (
    <Container>
      <form>
        <div className="form-row">
          <div className="col-4">
            <div className="p-3 border bg-light">
              <p>Nuevo Usuario</p>

              <input type="text" className="form-control" id="inputNombre" />
              <label for="inputName">Nombre</label>

              <input type="text" className="form-control" id="inputApellidoP" />
              <label for="inputApellidoP">Apellido Paterno</label>

              <input type="text" className="form-control" id="inputApellidoM" />
              <label for="inputApellidoM">Apelido Materno</label>

              <input type="text" className="form-control" id="inputTelefono" />
              <label for="inputTelefono">Telefono</label>

              <input type="email" className="form-control" id="inputEmail" />
              <label for="inputEmail">Email</label>

              <input type="password" className="form-control" id="inputPassword" />
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
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido paterno</th>
                    <th>Apellido materno</th>
                    <th>Telefono</th>
                    <th>email</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    data && data.getUsuarios &&
                    data.getUsuarios.map((usuario, index) => {
                      return (
                       
                       <tr key={index}>
                          <td>{index}</td>
                          
                          <td>{usuario.nombre}</td>
                          
                          <td>{usuario.apellidoP}</td>
                          
                          <td>{usuario.apellidoM}</td>
                          
                          <td>{usuario.telefono}</td>
                          
                          <td>{usuario.email}</td>
                        </tr>
                      )
                    }
                    )
                  }

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
