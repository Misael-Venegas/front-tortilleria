import { useState, useEffect, useContext } from "react";
import { Select, Button, Form, DatePicker, TimePicker, message } from "antd";
import { gql, useLazyQuery } from "@apollo/client";
import moment from "moment";
import CorteCajaContext from "./ContextCorteCaja";

const searchForm = {
  fecha: "",
  hora: "00:00:00",
  horaFinal: "12:00:00",
  usuario: "",
};

const OBTENERUSUARIOS = gql`
  query getUsuarios {
    getUsuarios {
      id
      email
      nombre
      apellidoP
      apellidoM
    }
  }
`;

const CorteCajaForm = () => {
  const [form, setForm] = useState(searchForm);
  const [formAuxiliar] = Form.useForm();
  const { filtrarVentas } = useContext(CorteCajaContext);
  const [getUsuarios, { data: dataUser }] = useLazyQuery(OBTENERUSUARIOS);

  const changeDate = (date, dateString) => {
    setForm({ ...form, ["fecha"]: dateString });
  };
  const changeHour = (time, timeString) => {
    setForm({ ...form, ["hora"]: timeString });
  };
  const changeHourFinal = (time, timeString) => {
    setForm({ ...form, ["horaFinal"]: timeString });
  };
  const handleChangedUser = (e) => {
    setForm({
      ...form,
      ["usuario"]: e,
    });
  };
  const handleSubmit = (e) => {
    if (form.fecha != "") {
      filtrarVentas(form);
    } else {
      message.error("Error: Debe seleccionar una fecha");
      return;
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return (
    <div className="row mt-3 bg-light shadow-sm rounded">
      <label>
        <strong>Busqueda</strong>
      </label>
      <Form form={formAuxiliar} name="control-hooks" onFinish={handleSubmit}>
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12">
            <Form.Item name="fecha" label="Fecha">
              <DatePicker
                onChange={changeDate}
                value={form.fecha}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12">
            <Form.Item name="hora" label="Hora">
              <TimePicker
                defaultValue={moment("00:00:00", "HH:mm:ss")}
                onChange={changeHour}
                value={form.hora}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12">
            <Form.Item name="horaFinal" label="A">
              <TimePicker
                defaultValue={moment("12:00:00", "HH:mm:ss")}
                onChange={changeHourFinal}
                value={form.horaFinal}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>
          <div className="col-lg-3 col-md-5 col-sm-12">
            <Form.Item name="usuario" label="Usuario">
              <Select
                onChange={handleChangedUser}
                value={form.usuario}
                style={{ width: "100%" }}
                placeholder="Seleccione..."
              >
                <Select.Option value=""></Select.Option>
                {dataUser &&
                  dataUser.getUsuarios.map((user, key) => {
                    return (
                      <Select.Option key={key} value={user.id}>
                        {user.nombre} {user.apellidoP} {user.apellidoM}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </div>
          <div className="col-lg-1 col-md-2 col-sm-6">
            <Button type="primary" htmlType="submit">
              {"Buscar"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CorteCajaForm;
