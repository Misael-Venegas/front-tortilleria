import { useContext, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import GastoOperacionContext from "./ContextGastoOperacion";
import { Input, Select, Button, Form, DatePicker } from "antd";

const searchForm = {
  producto: "-1",
  fecha: "",
  usuario: "-1",
  total: "",
};

const OBTENERPRODUCTOSALMACEN = gql`
  query getAlmacen {
    getAlmacen {
      id_Producto_Almacen
      nombre
      categoria
      unidad_Medida
      status
      stock
    }
  }
`;

const BusquedaGasto = () => {
  const { filtrarDatos, listUsuariosOption, listOption } = useContext(
    GastoOperacionContext
  );
  const [form, setForm] = useState(searchForm);
  const [formAuxiliar] = Form.useForm();
 /* const [listOption2, setListOption2] = useState(null);
  const [getAlmacen, { data, loading, error }] = useLazyQuery(
    OBTENERPRODUCTOSALMACEN
  );*/

  const handleChange = (e) => {
    setForm({
      ...form,
      ["total"]: e.target.value,
    });
  };
  const handleChangeSelected = (e) => {
    setForm({
      ...form,
      ["producto"]: e,
    });
  };
  const handleChangeSelectedUser = (e) => {
    setForm({
      ...form,
      ["usuario"]: e,
    });
  };
  const changeDate = (date, dateString) => {
    setForm({ ...form, ["fecha"]: dateString });
  };

  const handleSubmit = (e) => {
    filtrarDatos(form);
  };

  /*useEffect(() => {
    const cargaDatos = async () => {
      try {
        await getAlmacen();
        if (data) {
          setListOption2(data.getAlmacen);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    cargaDatos();
  }, [getAlmacen, data]);*/

  return (
    <div className="row">
      <label>Busqueda</label>
      <Form form={formAuxiliar} name="control-hooks" onFinish={handleSubmit}>
        <div className="row">
          <div className="col-md-3 col-sm-12">
            <Form.Item name="producto">
              <Select
                onChange={handleChangeSelected}
                value={form.producto}
                style={{ width: "100%" }}
                placeholder="Seleccione..."
              >
                <Select.Option value=""></Select.Option>
                {listOption &&
                  listOption.map((producto, key) => {
                    return (
                      <Select.Option
                        key={key}
                        value={producto.id_Producto_Almacen}
                      >
                        {producto.nombre} {producto.unidad_Medida}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-3 col-sm-12">
            <Form.Item name="fecha">
              <DatePicker
                onChange={changeDate}
                value={form.fecha}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div className="col-md-3 col-sm-12">
            <Form.Item name="usuario">
              <Select
                onChange={handleChangeSelectedUser}
                value={form.usuario}
                style={{ width: "100%" }}
                placeholder="Seleccione..."
              >
                <Select.Option value=""></Select.Option>
                {listUsuariosOption &&
                  listUsuariosOption.map((user, key) => {
                    return (
                      <Select.Option key={key} value={user.id}>
                        {user.email}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-2 col-sm-12">
            <Form.Item name="total">
              <Input
                onChange={handleChange}
                value={form.total}
                style={{ width: "100%" }}
                placeholder="Total"
              />
            </Form.Item>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <Button type="primary" htmlType="submit">
              {"Buscar"}
            </Button>
          </div>
        </div>
        {/*
        <div className="form-group col-md-3">
          <select
            className="form-control col-12"
            name="producto"
            onChange={handleChange}
            value={form.producto}
          >
            <option value="-1">Productos...</option>
            {listUsuariosOption &&
              listUsuariosOption.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.email}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group col-md-3">
          <input
            id="fecha"
            className="form-control col-12"
            type="date"
            placeholder="fecha"
            name="fecha"
            onChange={handleChange}
            value={form.fecha}
          />
        </div>
        <div className="form-group col-md-2">
          <select
            className="form-control col-12"
            name="usuario"
            onChange={handleChange}
            value={form.usuario}
          >
            <option value="-1">Usuarios...</option>
            {listUsuariosOption &&
              listUsuariosOption.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.email}
                </option>
              ))}
          </select>
        </div>
        <div className="form-group col-md-1">
          <input
            className="form-control col-12"
            type="text"
            placeholder="Total Compra"
            id="total"
            name="total"
            onChange={handleChange}
            value={form.total}
          />
        </div>
              
        <div className="form-group col-md-1">
          <input
            type="submit"
            value={"Buscar"}
            className="btn btn-secondary ms-3"
          />
        </div>*/}
      </Form>
    </div>
  );
};

export default BusquedaGasto;
