import MermasAgregar from "./MermasAgregar";
import MermasTabla from "./MermasTabla";

const MermasForm = () => {
  return (
    <div className="row">
      <div className="col-md-4 col-sm-12">
        <MermasAgregar></MermasAgregar>
      </div>
      <div className="col-md-8 col-sm-12">
          <MermasTabla></MermasTabla>
      </div>
    </div>
  );
};

export default MermasForm;
