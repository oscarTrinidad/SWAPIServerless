const swapi = require("swapi-node");
const { v4 } = require("uuid");

module.exports.verPersona = async (id) => {

  const persona = await swapi.people({ 
    id: id 
  }).then((response) => response).catch((error) => {});

  if (!persona?.name) {
    return null;
  }

  persona.id = v4();
  persona.cod_people = id;
  
  return persona;
};