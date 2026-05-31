import PlantProvider from "./plant-provider";
import PlantStateResolver from "./plant-state-resolver";
import Container from "react-bootstrap/Container";

const Plants = () => {
  return (
    <PlantProvider>
      <Container>
        <PlantStateResolver />
      </Container>
    </PlantProvider>
  );
};

export default Plants;
