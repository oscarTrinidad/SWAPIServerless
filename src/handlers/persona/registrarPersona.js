const { obtenerPersona } = require("../../process/obtenerPersona");
const AWS = require("aws-sdk");

const registrarPersona = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = JSON.parse(event.body);

  //Obtener data de SWAPI de process
  const persona = await obtenerPersona(id);

  if(persona == null){
    const msj1 = JSON.stringify({"message": "Persona no encontrada en SWAPI."},null,2);
    return {
      statusCode: 404,
      body: msj1,
    };
  } else {
    //Verificar si existe usuario con el codigo usuario
    const verificar = await dynamodb.scan({
      TableName: 'Persona',
      FilterExpression: 'codigo_persona = :cod',
      ExpressionAttributeValues: {':cod' : id}
    }).promise();

    if(verificar.Count == 1){
      var data = verificar.Items[0];
      const msj2 = JSON.stringify({
        "message": `El codigo '${data.codigo_persona}' ya esta vinculado con la persona '${data.nombre}' cuyo id es: '${data.id}'.`,
      },null,2);

      return {
        statusCode: 404,
        body: msj2,
      };

    } else {
      // Guardar Persona de SWAPI a DynamoDB
      await dynamodb.put({
        TableName: "Persona",
        Item: persona,
      }).promise();

      const msj3 = JSON.stringify({
        "message": `Los datos de ${persona.nombre} fueron registrados con éxito.`,
        "data": persona
      },null,2);

      return {
        statusCode: 200,
        body: msj3,
      };
    }
  }
};

module.exports = {
  registrarPersona,
};
