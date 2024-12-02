const databaseError = {
  "22P02": {
    code: 400,
    message: "Invalid params value",
  },
  23502: {
    code: 400,
    message:
      "Se ha violado la restricción NOT NULL en uno de los campos de la tabla",
  },
  23503: {
    code: 400,
    message: "Bad request",
  },
};
export const getDatabaseError = (code) => {
  return databaseError[code] || { code: 500, message: "Internal server error" };
};
