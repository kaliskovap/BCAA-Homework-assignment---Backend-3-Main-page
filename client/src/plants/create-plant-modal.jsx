import { useState, useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { PlantContext } from "./plant-provider";

function CreatePlantModal({
  show,
  onHide,
}) {
  const { handlerMap } =
    useContext(PlantContext);

  const [name, setName] =
    useState("");

  const [
    wateringInterval,
    setWateringInterval,
  ] = useState("");

  const handleSubmit =
    async () => {
      await handlerMap.handleCreate(
        name,
        Number(
          wateringInterval
        )
      );

      onHide();

      setName("");
      setWateringInterval("");
    };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Přidat rostlinu
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
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="outline-secondary"
          onClick={onHide}
        >
          Zrušit
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit}
        >
          Přidat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreatePlantModal;