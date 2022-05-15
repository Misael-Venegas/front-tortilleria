import { useContext, useState, useEffect } from "react";
import { UncontrolledAlert } from "reactstrap";
import GastoOperacionContext from "./ContextGastoOperacion";
import jwt_decode from "jwt-decode";
import moment from "moment";

import {
  message,
  Input,
  InputNumber,
  Select,
  Button,
  Form,
  DatePicker,
} from "antd";

const initialForm = {
  producto: -1,
  cantidad: 0,
  precio: 0,
  fecha: "",
  usuario: "-1",
  id_Usuario: 0,
  id: null,
};

const AgregarGastoForm = () => {
  const [form, setForm] = useState(initialForm);
  const {
    listOption,
    createData,
    seGuardo,
    mesaje,
    dataDelete,
    setDataDelete,
    deleteData,
  } = useContext(GastoOperacionContext);
  const [formAuxiliar] = Form.useForm();

  const handleSelect = (e) => {
    setForm({ ...form, ["producto"]: e });
  };
  const handleNumber = (e) => {
    setForm({ ...form, ["cantidad"]: e });
  };
  const handleNumberPrecio = (e) => {
    setForm({ ...form, ["precio"]: e });
  };
  const changeDate = (date, dateString) => {
    //console.log(date, dateString); //segundaBuena
    setForm({ ...form, ["fecha"]: dateString });
  };

  const handleSubmit = async (e) => {
    if (form.id === null) {
      if (form.producto >= 0) {
        if (form.cantidad >= 1) {
          if (form.precio >= 1) {
            if (form.fecha != "") {
              createData(form);
              handleReset();
            } else {
              message.error("Error: No ha seleccionado la fecha");
              return;
            }
          } else {
            message.error("Error: El precio debe ser mayor a cero");
            return;
          }
        } else {
          message.error("Error: La cantidad debe ser mayor a cero");
          return;
        }
      } else {
        message.error("Error: No ha seleccionado el producto");
        return;
      }
    } else {
      deleteData(form);
      handleReset();
    }
  };
  const handleReset = (e) => {
    setForm(initialForm);
    formAuxiliar.resetFields();
    setDataDelete(null);
  };

  {
    /**let optionTemplate = listOption.map((v) => (
    <Select.Option key={v.id_Producto_Almacen} value={v.id_Producto_Almacen}>
      {v.nombre}
      {": medida("}
      {v.unidad_Medida}
      {")"}
    </Select.Option>
  )); */
  }

  useEffect(() => {
    if (dataDelete) {
      setForm(dataDelete);
      formAuxiliar.setFieldsValue({
        producto: dataDelete["producto"],
      });
      formAuxiliar.setFieldsValue({
        cantidad: dataDelete["cantidad"],
      });
      formAuxiliar.setFieldsValue({
        precio: dataDelete["precio"],
      });
      formAuxiliar.setFieldsValue({
        fecha: moment(new Date(dataDelete["fecha"])),
      });
      formAuxiliar.setFieldsValue({
        usuario: dataDelete["usuario"],
      });
    } else {
      setForm(initialForm);
    }
  }, [dataDelete]);

  return (
    <div className="p-3 mt-1 border bg-light shadow-sm rounded">
      <p>{dataDelete ? "Eliminar Gasto" : "Datos Gasto Operación"}</p>
      {seGuardo && (
        <UncontrolledAlert color="success" className="mt-3">
          {mesaje}
        </UncontrolledAlert>
      )}
      <Form
        layout={"vertical"}
        form={formAuxiliar}
        name="control-hooks"
        onFinish={handleSubmit}
      >
        <Form.Item name="producto" label="Producto">
          <Select
            onChange={handleSelect}
            value={form.producto}
            placeholder="Seleccione..."
          >
            {listOption &&
              listOption.map((producto, key) => {
                return (
                  <Select.Option key={key} value={producto.id_Producto_Almacen}>
                    {`${producto.nombre}: medida(${producto.unidad_Medida})`}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item name="cantidad" label="Cantidad">
          <InputNumber
            onChange={handleNumber}
            value={form.cantidadAnt}
            style={{ width: "100%" }}
            required
          />
        </Form.Item>
        <Form.Item name="precio" label="Precio Compra">
          <InputNumber
            onChange={handleNumberPrecio}
            value={form.precio}
            style={{ width: "100%" }}
            required
          />
        </Form.Item>
        <Form.Item name="fecha" label="Fecha">
          <DatePicker
            onChange={changeDate}
            value={form.fecha}
            style={{ width: "100%" }}
          />
        </Form.Item>
        {/**defaultValue={moment(new Date(), "YYYY-MM-DD")} */}
        <Form.Item name="usuario" label="Usuario">
          <Input
            defaultValue={jwt_decode(localStorage.getItem("token")).email}
            style={{ width: "100%" }}
            value={form.usuario}
            readOnly
          />
        </Form.Item>
        <div className="form-row pt-4">
          <div className="col">
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-primary float-left"
            >
              {dataDelete ? "Eliminar" : "Guardar"}
            </Button>
          </div>
          <div className="col">
            <Button
              type="primary"
              htmlType="reset"
              onClick={handleReset}
              className="btn btn-danger float-right"
              danger
            >
              {dataDelete ? "Cancelar" : "Limpiar"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AgregarGastoForm;
