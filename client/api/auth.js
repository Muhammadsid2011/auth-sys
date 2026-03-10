import axios from "axios";

const API = "http://localhost:3000/api/user";

// 🔐 Login
export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${API}/login`,
            { email, password },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// 👤 Verify / Check User
export const checkUser = async () => {
    try {
        const response = await axios.get(
            `${API}/verify-user`,
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        return null;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(
            `${API}/logout`,
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}
export const signupUser = async ({ email, password, username }) => {
    try {
        const response = await axios.post(
            `${API}/signup`,
            { username, email, password },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const verifyOTP = async (email, otp) => {
    try {
        const response = await axios.post(
            `${API}/verify-otp`,
            { email, otp },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
export const resendOTP = async (email) => {
    try {
        const response = await axios.post(
            `${API}/resend-otp`,
            { email },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const googleLogin = async (credentialResponse) => {
  try {

    const res = await axios.post(
      "http://localhost:3000/api/user/google",
      {
        credential: credentialResponse.credential
      },
      { withCredentials: true }
    );

  } catch (error) {
    console.error(error);
  }finally{
    window.location.href = '/'
  }
};