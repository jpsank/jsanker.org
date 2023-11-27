const axios = require("axios");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let requestBody = JSON.parse(event.body);
  let path = requestBody.path;
  
  if (path === "" || !path) {
    return { statusCode: 400, body: "No path provided" };
  }

  let responseData = {};
  try {
    const response = await axios.get(path);
    responseData = response.data;
  } catch (error) {
    responseData = { error: error.message };
  }

  // forward the response
  return {
    statusCode: 200,
    body: JSON.stringify(responseData),
  };
};