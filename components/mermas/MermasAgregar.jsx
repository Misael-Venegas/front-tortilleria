import { gql, useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { UncontrolledAlert } from "reactstrap";
import MermasContext from "./MermasContext";
import { message, Input, InputNumber, Select, Button, Form } from "antd";

const initialForm = {
  producto: "",
  cantidad: 0,
  descripcion: "",
  fecha: formatDate(),
  id_usuario: -1,
  id: null,
};

function formatDate() {
  let date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return mm + "/" + dd + "/" + yyyy;
}

const GET_PRODUCTOS = gql`
  query getProductos($key: Float!) {
    getProductos(key: $key) {
      id_producto
      nombre
      precioVenta
      unidad
      id_producto_almacen
    }
  }
`;

const MermasAgregar = () => {
  const {
    dataDelete,
    createData,
    setDataDelete,
    seGuardo,
    mesaje,
    deleteData,
  } = useContext(MermasContext);
  const [form, setForm] = useState(initialForm);
  const [obtenerProductos, { data: dataProductos }] =
    useLazyQuery(GET_PRODUCTOS);
  const [formAuxiliar] = Form.useForm();

  useEffect(() => {
    obtenerProductos({
      variables: {
        key: Math.random(),
      },
    });
  }, [obtenerProductos]);

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
        descripcion: dataDelete["descripcion"],
      });
    } else {
      setForm(initialForm);
    }
  }, [dataDelete]);

  const handleChange = (e) => {
    setForm({
      ...form,
      ["descripcion"]: e.target.value,
    });
  };
  const handleSelect = (e) => {
    setForm({ ...form, ["producto"]: e });
  };
  const handleNumber = (e) => {
    setForm({ ...form, ["cantidad"]: e });
  };
  const handleSubmit = (e) => {
    if (form.id === null) {
      if (form.producto != "") {
        if (form.cantidad >= 1) {
          createData(form);
          handleReset();
        } else {
          message.error("Error: La cantidad debe ser mayor a 0");
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
    formAuxiliar.resetFields();
    setForm(initialForm);
    setDataDelete(null);
  };

  return (
    <div className="p-3 mt-1 border bg-light shadow-sm rounded">
      <p>{dataDelete ? "Eliminar Merma" : "Merma"}</p>
      <Form
        layout={"vertical"}
        form={formAuxiliar}
        name="control-hooks"
        onFinish={handleSubmit}
      >
        <Form.Item name="producto" label="Producto" className="pt-1">
          <Select
            onChange={handleSelect}
            value={form.producto}
            placeholder="Seleccione..."
          >
            {dataProductos &&
              dataProductos.getProductos.map((producto, key) => {
                return (
                  <Select.Option key={key} value={producto.nombre}>
                    {producto.nombre}
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
        <Form.Item name="descripcion" label="Descripción">
          <Input.TextArea
            onChange={handleChange}
            value={form.descripcion}
            style={{ width: "100%", resize: "none" }}
            maxLength={100}
            required
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
      {seGuardo && (
        <UncontrolledAlert color="success" className="mt-3">
          {mesaje}
        </UncontrolledAlert>
      )}
    </div>
  );
};

export default MermasAgregar;
