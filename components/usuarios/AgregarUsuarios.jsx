import React, { useState } from "react";
import Container from "../principal/Container";
import DatosUsuarios from "./DatosUsuarios";
import TablaUsuarios from "./TablaUsuarios";


const AgregarUsuarios = () => {

  const [selectTipo, setSelectTipo] = useState("")
  const [nombre, setNombre] = useState("")
  const [paterno, setPaterno] = useState("")
  const [materno, setMaterno] = useState("")
  const [telefono, setTelefono] = useState("")
  const [email, setEmail] = useState("")
  const [contrasenhia, setContrasenhia] = useState("")
  const [idUsuario, setIdUsuario] = useState("")

  const [actualizar, setActualizar] = useState(3.1416)


  const llenarDatosUsuario = (usuario) => {
    setNombre(usuario.nombre)
    setPaterno(usuario.apellidoP)
    setMaterno(usuario.apellidoM)
    setTelefono(usuario.telefono)
    setEmail(usuario.email)
    setSelectTipo(usuario.tipo)
    setIdUsuario(usuario.id)
  }

  return (
    <Container>

      <div className="row">
        <div className="col-md-4 col-sm-12">
          <DatosUsuarios setActualizar={setActualizar}
            selectTipo={selectTipo} setSelectTipo={setSelectTipo}
            nombre={nombre} setNombre={setNombre}
            paterno={paterno} setPaterno={setPaterno}
            materno={materno} setMaterno={setMaterno}
            telefono={telefono} setTelefono={setTelefono}
            email={email} setEmail={setEmail}
            contrasenhia={contrasenhia} setContrasenhia={setContrasenhia}
            idUsuario={idUsuario} setIdUsuario={setIdUsuario}
          />
        </div>

        <div className="col-md-8 col-sm-12">
          <div className="border bg-light">
            <TablaUsuarios actualizar={actualizar} llenarDatosUsuario={llenarDatosUsuario} />
          </div>
        </div>
      </div>

    </Container>
  );
};

export default AgregarUsuarios;
