import { useContext } from "react";

import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";

import {
  mdiEyeOutline,
  mdiWaterOutline,
  mdiDeleteOutline,
} from "@mdi/js";

import { PlantContext } from "./plant-provider";

function PlantRow({
  plant,
  onDetail,
}) {
  const { handlerMap } =
    useContext(PlantContext);

  return (
    <tr
      style={{
        background:
          "rgba(255,255,255,0.12)",
      }}
    >
      <td
        style={{
          fontWeight: 500,
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              background:
                "#6AA04E",
              flexShrink: 0,
            }}
          />

          {plant.name}
        </div>
      </td>

      <td>
        {plant.wateringInterval}
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

      <td>
        <div className="d-flex gap-2">
          <Button
            size="sm"
            className="
              border-0
              shadow-none
              d-flex
              align-items-center
              justify-content-center
            "
            style={{
              width: "44px",
              height: "25px",
              background:
                "#7A7F87",
            }}
            onClick={() =>
              onDetail(plant)
            }
          >
            <Icon
              path={mdiEyeOutline}
              size={0.9}
              color="white"
            />
          </Button>

          <Button
            size="sm"
            className="
              border-0
              shadow-none
              d-flex
              align-items-center
              justify-content-center
            "
            style={{
              width: "44px",
              height: "25px",
              background:
                "#6A8CD7",
            }}
            onClick={() =>
              handlerMap.handleWater(
                plant.id
              )
            }
          >
            <Icon
              path={
                mdiWaterOutline
              }
              size={0.9}
              color="white"
            />
          </Button>

          <Button
            size="sm"
            className="
              border-0
              shadow-none
              d-flex
              align-items-center
              justify-content-center
            "
            style={{
              width: "44px",
              height: "25px",
              background:
                "#bd4d4dcd",
            }}
            onClick={() =>
              handlerMap.handleDelete(
                plant.id
              )
            }
          >
            <Icon
              path={
                mdiDeleteOutline
              }
              size={0.9}
              color="white"
            />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default PlantRow;