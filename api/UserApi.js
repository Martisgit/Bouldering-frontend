import axios from "axios";
import cookie from "js-cookie";

const API_URL = "https://bouldering-api.onrender.com";

export const loginUser = async (email, password) => {
  const userData = { email, password };

  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.status === 200) {
    cookie.set("jwt_token", response.data.token, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

    cookie.set("user_id", response.data.user.id);

    return response.data;
  }

  throw new Error("Failed to log in.");
};

export const registerUser = async (email, name, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    name,
    password,
  });

  if (response.status === 201) {
    if (response.data.token) {
      cookie.set("jwt_token", response.data.token, {
        secure: true,
        sameSite: "strict",
      });
    }

    if (response.data.user && response.data.user.id) {
      cookie.set("user_id", response.data.user.id);
    }

    return response.data;
  }

  throw new Error(response.data.message || "Sign up failed.");
};
