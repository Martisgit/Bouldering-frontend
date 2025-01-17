import axios from "axios";
import cookie from "js-cookie";

const API_URL = "https://bouldering-api.onrender.com";

// get the token
const getToken = () => {
  return cookie.get("jwt_token");
};

export const addBeta = async (boulderId, media) => {
  const token = getToken();
  const response = await axios.post(
    `${API_URL}/boulders/${boulderId}/beta`,
    { media },
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const fetchBoulderDetails = async (boulderId) => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/boulders/${boulderId}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const toggleBoulderCompletion = async (boulderId) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/boulders/${boulderId}/completed`,
    {},
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const fetchBetas = async (boulderId) => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/boulders/${boulderId}/beta`, {
    headers: { Authorization: token },
  });
  return response.data.betas;
};

export const likeOrDislikeBeta = async (boulderId, betaId, action) => {
  const token = getToken();
  const response = await axios.put(
    `${API_URL}/boulders/${boulderId}/beta/${betaId}/like-dislike`,
    { action },
    { headers: { Authorization: token } }
  );
  return response.data.beta;
};

export const deleteBoulder = async (boulderId) => {
  const token = getToken();
  const response = await axios.delete(`${API_URL}/boulders/${boulderId}`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const deleteBeta = async (boulderId, betaId) => {
  const token = getToken();
  const response = await axios.delete(
    `${API_URL}/boulders/${boulderId}/beta/${betaId}`,
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const fetchUserNames = async (userIds) => {
  const token = getToken();
  const response = await axios.post(
    `${API_URL}/users/names`,
    { userIds },
    { headers: { Authorization: token } }
  );
  return response.data.names;
};

export const insertBoulder = async (name, gym, difficulty, picture) => {
  const token = getToken();
  const response = await axios.post(
    `${API_URL}/boulders`,
    { name, gym, difficulty, picture },
    { headers: { Authorization: token } }
  );
  return response.data;
};

export const fetchBoulders = async () => {
  const token = getToken();
  const response = await axios.get(`${API_URL}/boulders`, {
    headers: { Authorization: token },
  });
  return response.data.boulders;
};
