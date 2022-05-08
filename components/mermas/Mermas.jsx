import Container from "../principal/Container";
import MermasForm from "./MermasForm";

const Mermas = () => {
  return (
    <Container>
      <div className="row  pb-3">
        <div className="col-md-1 col-sm-2">
          <span className="ml-3">Usuario :</span>
        </div>
        <div className="col-md-7 col-sm-8 ">
          <span className="ml-3"> marco guzman</span>
        </div>
        <div className="col-md-4 col-sm-12">
          <span className="float-right mr-3">
            {new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
      <MermasForm />
    </Container>
  );
};

export default Mermas;
