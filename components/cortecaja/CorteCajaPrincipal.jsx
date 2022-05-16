import CorteCajaForm from "./CorteCajaForm";
import CorteCajaTabla from "./CorteCajaTable";
import { Tag } from "antd";
import jwt_decode from "jwt-decode";

const CorteCajaPrincipal = () => {
  return (
    <div className="row ">
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <Tag color="cyan">
            {`Le atiende: [${jwt_decode(localStorage.getItem("token")).id}] ${
              jwt_decode(localStorage.getItem("token")).nombre
            } ${jwt_decode(localStorage.getItem("token")).apellidoP} ${
              jwt_decode(localStorage.getItem("token")).apellidoM
            }`}{" "}
          </Tag>
        </div>
        <div className="col-md-4 col-sm-12">
          <Tag color="green" className="float-right mr-3">
            {new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString()}
          </Tag>
        </div>
      </div>
      <div className="row m-2">
        <CorteCajaForm></CorteCajaForm>
      </div>
      <div className="row">
        <CorteCajaTabla></CorteCajaTabla>
      </div>
    </div>
  );
};

export default CorteCajaPrincipal;
