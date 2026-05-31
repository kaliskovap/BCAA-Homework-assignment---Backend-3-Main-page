import {
  useState,
  useEffect,
  useContext,
} from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { PlantContext } from "./plant-provider";

function UpdatePlantModal({
  show,
  onHide,
  plant,
}) {
  const { handlerMap } =
    useContext(PlantContext);

  const [name, setName] =
    useState("");

  const [
    wateringInterval,
    setWateringInterval,
  ] = useState("");

  const [
  wateringDate,
  setWateringDate,
] = useState("");
console.log(plant);
  useEffect(() => {
  if (plant) {
    setName(plant.name);

    setWateringInterval(
      plant.wateringInterval
    );

    setWateringDate(
      plant.lastWatering
        ? plant.lastWatering.split(
            "T"
          )[0]
        : ""
    );
  }
}, [plant]);

const handleSubmit =
  async () => {
    await handlerMap.handleUpdate(
      plant.id,
      name,
      Number(
        wateringInterval
      )
    );

    if (wateringDate) {
      if (
        plant.lastWateringRecordId
      ) {
        await handlerMap.handleUpdateWatering(
          plant.lastWateringRecordId,
          wateringDate
        );
      } else {
        await handlerMap.handleWater(
          plant.id,
          wateringDate
        );
      }
    }

    await handlerMap.fetchPlants();

    onHide();
  };

  if (!plant) {
    return null;
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Detail rostliny
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>
              Název rostliny
            </Form.Label>

            <Form.Control
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Interval zalévání
            </Form.Label>

            <Form.Control
              type="number"
              value={
                wateringInterval
              }
              onChange={(e) =>
                setWateringInterval(
                  e.target.value
                )
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
  <Form.Label>
    Poslední zálivka
  </Form.Label>

  <Form.Control
    type="date"
    value={wateringDate}
    onChange={(e) =>
      setWateringDate(
        e.target.value
      )
    }
  />
</Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onHide}
        >
          Zavřít
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit}
        >
          Uložit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdatePlantModal;