import axios from "axios";
import cookie from "js-cookie";

const API_URL = "http://localhost:3002";

export const loginUser = async (email, password) => {
  try {
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
  } catch (error) {
    throw new Error(
      error.response?.data?.messages?.join(", ") ||
        error.response?.data?.message ||
        "Login failed. Please try again."
    );
  }
};

export const registerUser = async (email, name, password) => {
  try {
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
  } catch (error) {
    // Forward validation errors from the backend
    throw new Error(
      error.response?.data?.messages?.join(", ") ||
        "Sign up failed. Please try again."
    );
  }
};
