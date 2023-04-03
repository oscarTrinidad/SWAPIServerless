const AWS = require("aws-sdk");

const listarPersona = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const resultado = await dynamodb.scan({ 
    TableName: "Persona"
  }).promise();

  const data = JSON.stringify(resultado.Items,null,2);
  
  return {
    statusCode: 200,
    body: data,
  };
};

module.exports = {
  listarPersona,
};