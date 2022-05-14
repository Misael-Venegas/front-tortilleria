import { useContext } from "react";
import Message from "../globales/Message";
import MermasAgregar from "./MermasAgregar";
import MermasContext from "./MermasContext";
import MermasTabla from "./MermasTabla";

const MermasForm = () => {
  const { dataMermas, errorMensaje, loadingMermas } = useContext(MermasContext);
  return (
    <div className="row">
      <div className="col-md-4 col-sm-12">
        <MermasAgregar></MermasAgregar>
      </div>
      <div className="col-md-8 col-sm-12">
        {loadingMermas && (
          <div className="row justify-content-center">
            <div className="col-4">
              <div className="loader" />
            </div>
          </div>
        )}
        {errorMensaje && (
          <Message
            msg={`Error: No se pudieron obtener los registros de la base datos`}
            bgColor="alert alert-danger"
          />
        )}
        {dataMermas && dataMermas.getMermas && <MermasTabla></MermasTabla>}
      </div>
    </div>
  );
};

export default MermasForm;
