import { useContext, useState } from "react";

import { PlantContext } from "./plant-provider";
import PlantRow from "./plant-row";
import CreatePlantModal from "./create-plant-modal";
import UpdatePlantModal from "./update-plant-modal";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function PlantList() {
  const { data } =
    useContext(PlantContext);

  // CREATE MODAL

  const [showModal, setShowModal] =
    useState(false);

  // UPDATE MODAL

  const [
    selectedPlant,
    setSelectedPlant,
  ] = useState(null);

  const [
    showUpdateModal,
    setShowUpdateModal,
  ] = useState(false);

  return (
    <Card
      className="
      
        shadow-sm
        border-0
        p-4
      "
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        maxWidth: "1000px"
      }}
    >
      {/* HEADER */}

      <div
        className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        "
      >
        <div>
          <h3 className="mb-1">
            Moje rostliny
          </h3>
        </div>

        <Button
          onClick={() =>
            setShowModal(true)
          }

          style={{
        background:"#5E6B4C",
        border:"none"
      }}
        >
          Přidat rostlinu
        </Button>
      </div>

      {/* TABLE */}

      {data.itemList.length > 0 ? (
        <Table hover responsive 
  borderless
  style={{
    "--bs-table-bg": "transparent",
    "--bs-table-striped-bg": "transparent",
    "--bs-table-hover-bg":
      "rgba(255,255,255,0.2)",
  }}
>
          <thead
            style={{backgroundColor:"rgba(255,255,255,0.35)",}}>
            <tr>
              <th>
                Název rostliny
              </th>

              <th>
                Interval zalévání (dny)
              </th>

              <th>
                Poslední zálivka
              </th>

              <th>Akce</th>
            </tr>
          </thead>

          <tbody>
            {data.itemList.map(
              (plant) => (
                <PlantRow
                  key={plant.id}
                  plant={plant}
                  onDetail={(
                    plant
                  ) => {
                    setSelectedPlant(
                      plant
                    );

                    setShowUpdateModal(
                      true
                    );
                  }}
                />
              )
            )}
          </tbody>
        </Table>
      ) : (
        <div
          className="
            text-center
            p-5
            text-muted
          "
        >
          Žádné rostliny
          nejsou evidovány
        </div>
      )}

      {/* CREATE MODAL */}

      <CreatePlantModal
        show={showModal}
        onHide={() =>
          setShowModal(false)
        }
      />

      {/* UPDATE MODAL */}

      <UpdatePlantModal
        show={showUpdateModal}
        onHide={() =>
          setShowUpdateModal(false)
        }
        plant={selectedPlant}
      />
    </Card>
  );
}

export default PlantList;