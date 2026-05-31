import { useContext } from "react";
import { PlantContext } from "./plant-provider";
import Loading from "../common/loading";
import Error from "../common/error";
import PlantList from "./plant-list";

const PlantStateResolver = () => {
  const { data, state, error } = useContext(PlantContext);

  if (data) {
    return <PlantList />;
  }

  if (state === "loading" && !data) {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div style={{ position: "absolute" }}>
          <Loading size={7} spin={4} />
        </div>
        <div style={{ position: "absolute" }}>
          <Loading size={6} spin={2} />
        </div>
        <div style={{ position: "absolute" }}>
          <Loading size={9} spin={6} />
        </div>
      </div>
    );
  }

  if (state === "error" && !data) {
    return <Error message={error} />;
  }
};

export default PlantStateResolver;
