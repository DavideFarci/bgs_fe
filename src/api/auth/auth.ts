// @ts-ignore
import api from "../axios/axiosConfig.js";
import type { LoginData, LoginResponse, RegisterData } from "./types";

const API_URL = "http://localhost:8000/api/auth/";

export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    `${API_URL}token/`,
    credentials
  );
  const { access, refresh } = response.data;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);

  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("access");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh");
};

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  // Prima registro l'utente
  await api.post(`${API_URL}register/`, data);

  // Poi faccio il login automatico usando username e password
  const loginData: LoginData = {
    username: data.username,
    password: data.password,
  };
  return await login(loginData);
};
