// service.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Your API base URL

/**
 * Registers a new user.
 * @param {object} userData - The user registration data.
 * @param {string} userData.email - The user's email address.
 * @param {string} userData.password - The user's password.
 * @param {string} userData.username - The user's username.
 * @param {string} userData.full_name - The user's full name.
 * @returns {Promise<string>} A promise that resolves with a success message or rejects with an error.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Assuming the API returns a success message directly
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Connects a blockchain wallet for user login/registration.
 * @param {object} walletData - The wallet connection data.
 * @param {string} walletData.wallet_address - The user's wallet address.
 * @param {string} walletData.signature - The signature from the wallet.
 * @param {string} walletData.message - The message that was signed.
 * @returns {Promise<string>} A promise that resolves with a success message or rejects with an error.
 */
export const connectWallet = async (walletData) => {
  try {
    const response = await axios.post(`${API_URL}/connect-wallet`, walletData);
    return response.data; // Assuming the API returns a success message directly
  } catch (error) {
    console.error('Error connecting wallet:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Refreshes the authentication token.
 * @returns {Promise<string>} A promise that resolves with a new token or rejects with an error.
 */
export const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/refresh`);
    return response.data; // Assuming the API returns the new token directly
  } catch (error) {
    console.error('Error refreshing token:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Logs out the user and invalidates the token.
 * Note: JWT tokens cannot be invalidated server-side without additional mechanisms
 * like a token blacklist. This endpoint is more for client-side cleanup.
 * @returns {Promise<string>} A promise that resolves with a success message or rejects with an error.
 */
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data; // Assuming the API returns a success message directly
  } catch (error) {
    console.error('Error logging out user:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Performs a basic health check on the API.
 * @returns {Promise<string>} A promise that resolves with a success message (e.g., "OK") or rejects with an error.
 */
export const getHealthStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    return response.data; // Assuming the API returns a simple status like "OK"
  } catch (error) {
    console.error('Error getting health status:', error.response?.data || error.message);
    throw error;
  }
};