import { useContext, useState } from "react";
import AlmacenContext from "./ContextAlmacen";
import { Input, Select, Button, Form } from "antd";

const searchForm = {
  nombreBusqueda: "",
  categoriaBusqueda: "",
};
const AlmacenBusqueda = () => {
  const { filtrarDatos } = useContext(AlmacenContext);
  const [form, setForm] = useState(searchForm);
  const [formAuxiliar] = Form.useForm();

  const handleChange = (e) => {
    setForm({
      ...form,
      ["nombreBusqueda"]: e.target.value,
    });
  };

  const handleChangeSelected = (e) => {
    setForm({
      ...form,
      ["categoriaBusqueda"]: e,
    });
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    filtrarDatos(form);
  };

  return (
    <div className="row">
      <label>Busqueda</label>
      <Form form={formAuxiliar} name="control-hooks" onFinish={handleSubmit}>
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <Form.Item name="nombreBusqueda">
              <Input
                onChange={handleChange}
                value={form.nombreBusqueda}
                style={{ width: "100%" }}
                placeholder="Nombre Porducto"
              />
            </Form.Item>
          </div>
          <div className="col-md-4 col-sm-12">
            <Form.Item name="categoriaBusqueda">
              <Select
                onChange={handleChangeSelected}
                value={form.categoriaBusqueda}
                placeholder="Seleccione..."
              >
                <Select.Option value=""></Select.Option>
                <Select.Option value="Insumo">Insumo</Select.Option>
                <Select.Option value="Utilitarios">Utilitarios</Select.Option>
                <Select.Option value="Refaccion">Refaccion</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-4 col-sm-12">
            <Button type="primary" htmlType="submit">
              {"Buscar"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AlmacenBusqueda;
