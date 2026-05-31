import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

function ToWaterList() {
  const [plantList, setPlantList] =
    useState([]);

  useEffect(() => {
    loadPlantsToWater();
  }, []);

  const loadPlantsToWater =
    async () => {
      const response = await fetch(
        "/plant/list-to-water"
      );

      const data =
        await response.json();

      setPlantList(data);
    };

  return (
    <Card
      className="
        shadow-sm
        border-0
        p-4
      "
      style={{
        background:
          "rgba(255,255,255,0.92)",

        backdropFilter:
          "blur(4px)",

        borderRadius: "24px",
      }}
    >
      <h3 className="mb-4">
        Rostliny k zalití
      </h3>

      {plantList.length > 0 ? (
        <Table hover responsive>
          <thead>
            <tr>
              <th>
                Název rostliny
              </th>

              <th>
                Interval zalévání
              </th>

              <th>
                Poslední zálivka
              </th>
            </tr>
          </thead>

          <tbody>
            {plantList.map(
              (plant) => (
                <tr key={plant.id}>
                  <td>
                    {plant.name}
                  </td>

                  <td>
                    {
                      plant.wateringInterval
                    }{" "}
                    dní
                  </td>

                  <td>
                    {plant.lastWatering
                      ? new Date(
                          plant.lastWatering
                        ).toLocaleDateString(
                          "cs-CZ"
                        )
                      : "-"}
                  </td>
                </tr>
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
          nepotřebují zalít
        </div>
      )}
    </Card>
  );
}

export default ToWaterList;