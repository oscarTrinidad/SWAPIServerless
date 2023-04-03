const AWS = require("aws-sdk");

const traerPersona = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { id } = event.pathParameters;

  const resultado = await dynamodb.get({
    TableName: "Persona",
    Key: { id },
  }).promise();

  const data = JSON.stringify(resultado.Item,null,2);
  return {
    statusCode: 200,
    body: data,
  };
};

module.exports = {
 traerPersona,
};