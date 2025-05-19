import axios from "axios";

export const backendURL= 'http://localhost:3001/'

export const api = axios.create({
  baseURL: backendURL,
});
