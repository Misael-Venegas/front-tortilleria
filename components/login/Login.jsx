import React from "react";
import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import ModalEnvarContrasenhia from "./ModalEnvarContrasenhia";
const LOGIN = gql`
  query login($correo: String!, $contrasenia: String!, $key: Float!) {
    login(correo: $correo, contrasenia: $contrasenia, key: $key) {
          token
    }
  }
`;

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [contrasenhia, setContrasenhia] = useState("");
  const [login, { data, loading, error }] = useLazyQuery(LOGIN);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/almacen");
    }
  }, [])

  //Método para realizar consulta de loging a la BD
  const inciarSesion = async () => {
    try {
      await login({
        variables: {
          correo,
          contrasenia: contrasenhia,
          key: Math.random(),
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (data) {
    if (data.login) {
      console.log(data)
      localStorage.setItem("token", data.token)
      router.push("/almacen");
    }
  }
  return (
    <>
      <div className="row d-flex justify-content-center align-items-center ">
        <div className="col-xl-10">
          <div className=" text-black">
            <div className="row g-0">
              <div className="col-lg-5 mx-auto shadow">
                <div className=" p-md-4 mx-md-4 ">
                  <div className="text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style={{ width: "185px" }}
                      alt="logo"
                    />
                    <h4 className="mt-1 mb-5 pb-1">Tortilleria</h4>
                  </div>
                  <form>
                    <p>Ingresa tus credenciales </p>
                    <div className="form-outline mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="example@example.com"
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                      <label className="form-label">Correo electronico</label>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setContrasenhia(e.target.value)}
                      />
                      <label className="form-label">Contraseña</label>
                    </div>
                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {" "}
                        {error.message}{" "}
                      </div>
                    )}

                    <div className="text-center pt-1 mb-5 pb-1">
                      <button
                        className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                        type="button"
                        onClick={inciarSesion}
                        disabled={loading}
                      >
                        {loading && (
                          <span
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        )}
                        Iniciar sesión
                      </button>
                      <p className="text-muted" onClick={() => setOpenModal(true)} >
                        ¿Olvidaste tu contraseña?
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalEnvarContrasenhia openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Login;
