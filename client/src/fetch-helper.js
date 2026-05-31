async function Call(baseUri, useCase, dtoIn, method) {
  // return fetch
  let response;
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:3000";

const FetchHelper = {


  plant: {
    get: async (dtoIn) => {
      return await Call(baseUri, "plant/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "plant/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "plant/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "plant/delete", dtoIn, "post");
    },
    list: async () => {
      return await Call(baseUri, "plant/list", null, "get");
    },
  },
};

export default FetchHelper;
