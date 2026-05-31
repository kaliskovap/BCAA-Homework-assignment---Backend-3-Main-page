import {
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./navigation";

import PlantList from "./plants/plant-list";
import ToWaterList from "./plants/to-water-list";
import PlantProvider from "./plants/plant-provider";

function App() {
  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* SIDEBAR */}

      <Navigation />

      {/* CONTENT */}

      <main
        className="flex-grow-1 p-5"
        style={{
          backgroundColor: "#7C8764",

          backgroundRepeat: "repeat",

          backgroundSize: "700px",

          backgroundPosition: "center",
        }}
      >
        <PlantProvider>
          <Routes>
            <Route
              path="/"
              element={<PlantList />}
            />

            <Route
              path="/plantList"
              element={<PlantList />}
            />

            <Route
              path="/toWater"
              element={<ToWaterList />}
            />
          </Routes>
        </PlantProvider>
      </main>
    </div>
  );
}

export default App;