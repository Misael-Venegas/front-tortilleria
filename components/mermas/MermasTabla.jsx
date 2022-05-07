const MermasTabla = () => {
  return (
    <div className="">
      <h5 className="ml-2">Mermas</h5>
      <div className="table-wrapper-scroll-y my-custom-scrollbar scrollbar-black thin">
        <div className="force-overflow">
          <table className="table table-striped" id="tablaGastos">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Descripción</th>
                <th>Usuario</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {/*db.length > 0 ? (
                db.map((el) => (
                  <TablaRow key={el.id_operacion} el={el} />
                ))
              ) : (
                <tr>
                  <td>Sin datos</td>
                </tr>
              )*/}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MermasTabla;
