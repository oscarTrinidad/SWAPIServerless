const { registrarPersona } = require("../handlers/persona/registrarPersona");

describe("registrarPersona", () => {
    test("No se llego a registrar una Persona dando un error 404 Not Found ",async()=>{
        var event = {
            body: JSON.stringify({
                "id": 1500,
            }),
        };
        const res = await registrarPersona(event).then((res) => res);
        expect(res.statusCode).toBe(404);
    });
})