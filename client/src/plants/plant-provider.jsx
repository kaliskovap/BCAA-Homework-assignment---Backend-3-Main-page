import {
  createContext,
  useState,
  useEffect,
} from "react";

export const PlantContext =
  createContext();

const PlantProvider = ({
  children,
}) => {
  const [data, setData] = useState({
    itemList: [],
  });

  const [error, setError] =
    useState();

  const [state, setState] =
    useState("ready");

  // LOAD PLANTS

  const fetchPlants = async () => {
    try {
      setState("loading");

      const response = await fetch(
        "/plant/list"
      );

      if (response.ok) {
        const data =
          await response.json();

        setData(data);

        setState("success");
      } else {
        setError(
          response.statusText
        );

        setState("error");
      }
    } catch (e) {
      setError(e.message);

      setState("error");
    }
  };

  // CREATE PLANT

  const handleCreate = async (
    name,
    wateringInterval
  ) => {
    try {
      setState("creating");

      const response = await fetch(
        "/plant/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            wateringInterval,
          }),
        }
      );

      if (response.ok) {
        const newPlant =
          await response.json();

        setData((currentData) => ({
          itemList: [
            ...currentData.itemList,
            newPlant,
          ],
        }));

        setState("success");
      } else {
        setError(
          response.statusText
        );

        setState(
          "errorCreating"
        );
      }
    } catch (e) {
      setError(e.message);

      setState("errorCreating");
    }
  };

  // UPDATE PLANT

  const handleUpdate = async (
    id,
    name,
    wateringInterval
  ) => {
    try {
      setState("updating_" + id);

      const response = await fetch(
        "/plant/update",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
            name,
            wateringInterval,
          }),
        }
      );

      if (response.ok) {
        const updatedPlant =
          await response.json();

        setData((currentData) => {
          const itemIndex =
            currentData.itemList.findIndex(
              (item) =>
                item.id === id
            );

          const newItemList = [
            ...currentData.itemList,
          ];

          newItemList[itemIndex] = {
            ...currentData.itemList[
              itemIndex
            ],

            ...updatedPlant,
          };

          return {
            itemList:
              newItemList,
          };
        });

        setState("success");
      } else {
        setError(
          response.statusText
        );

        setState(
          "errorUpdating"
        );
      }
    } catch (e) {
      setError(e.message);

      setState("errorUpdating");
    }
  };

  // DELETE PLANT

  const handleDelete = async (
    id
  ) => {
    try {
      setState("deleting_" + id);

      const response = await fetch(
        "/plant/delete",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        }
      );

      if (response.ok) {
        setData((currentData) => ({
          itemList:
            currentData.itemList.filter(
              (item) =>
                item.id !== id
            ),
        }));

        setState("success");
      } else {
        setError(
          response.statusText
        );

        setState(
          "errorDeleting"
        );
      }
    } catch (e) {
      setError(e.message);

      setState("errorDeleting");
    }
  };

  // WATER PLANT

  const handleWater = async (
    plantId,
    wateringDate = null
  ) => {
    try {
      setState(
        "watering_" + plantId
      );

      const response = await fetch(
        "/watering-record/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            plantId,

            wateringDate:
              wateringDate ||
              new Date()
                .toISOString()
                .split("T")[0],
          }),
        }
      );

      if (response.ok) {
        await fetchPlants();

        setState("success");
      } else {
        setError(
          response.statusText
        );

        setState(
          "errorWatering"
        );
      }
    } catch (e) {
      setError(e.message);

      setState(
        "errorWatering"
      );
    }
  };

  const handleUpdateWatering =
  async (
    wateringRecordId,
    wateringDate
  ) => {
    const response =
      await fetch(
        "/watering-record/update",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            id: wateringRecordId,
            wateringDate,
          }),
        }
      );

    if (!response.ok) {
      throw new Error(
        "Update watering failed"
      );
    }

    await fetchPlants();
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <PlantContext.Provider
      value={{
        data,
        state,
        error,

        handlerMap: {
          fetchPlants,
          handleCreate,
          handleUpdate,
          handleDelete,
          handleWater,
          handleUpdateWatering
        },
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

export default PlantProvider;