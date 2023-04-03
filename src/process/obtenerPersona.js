const { verPersona } = require("../services/persona/persona.service");

module.exports.obtenerPersona = async (id) => {
  const persona = await verPersona(id);

  if(persona == null){
    return null
  } else {
    return {
      "id": persona.id,
      "codigo_persona": persona.cod_people,
      "anio_nacimiento": persona.birth_year,
      "color_ojos": persona.eye_color,
      "genero": persona.gender,
      "color_cabello": persona.hair_color,
      "altura": persona.height,
      "masa": persona.mass,
      "nombre": persona.name,
      "color_piel": persona.skin_color
    };
  }
};