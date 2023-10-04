import axios from "axios";

const netlifyFunctionsPath = "/.netlify/functions";
const serverQuery = async (path) => {
  // a simple wrapper for making fetch GET requests
  // no need to supply the whole URL, only the relative path
  return axios.post(`${netlifyFunctionsPath}/serverQuery`, { path: path });
};

const backendURL = "https://api.jsanker.org";
const queryBackend = async (relativePath) => {
  return serverQuery(`${backendURL}/${relativePath}`);
};


// Main API functions
export const fetchResponseFromAPI = async (endpoint, params = {}) => {
  return queryBackend(endpoint + "?" + new URLSearchParams(params));
};

export const fetchFromAPI = async (endpoint, params = {}) => {
  return fetchResponseFromAPI(endpoint, params).then((response) => {
    return response.data;
  });
};

// Game of Life API functions
export const fetchGOLPattern = async (id = null) => {
  return fetchFromAPI("pattern", { id: id });
};
