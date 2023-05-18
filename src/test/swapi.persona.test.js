const { obtenerPersona } = require("../process/obtenerPersona");

describe("obtenerPersona", () => {
  test("Cliente encontrado. Responde con un objeto",async()=>{
    const response = await obtenerPersona(1);
    expect(response).toBeInstanceOf(Object);
  });
  test("No existe la persona con este id. Responde con un valor null.",async()=>{
    const response = await obtenerPersona(1000);
    expect(response).toBeNull();
  });
})