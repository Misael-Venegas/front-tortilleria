import { MermasProvider } from "./MermasContext";
import MermasForm from "./MermasForm";

const Mermas = () => {
  return (
    <MermasProvider>
      <MermasForm />
    </MermasProvider>
  );
};

export default Mermas;
