// @ts-ignore
import api from "../axios/axiosConfig.js";
import type { Game, CrudClientOptions } from "./types";

const createCrudClient = <T>(options: CrudClientOptions<T>) => {
  const { baseUrl } = options;

  const request = async <R = T>(
    method: string,
    path: string = "",
    body?: any
  ): Promise<R> => {
    const config = {
      method: method as any,
      url: `${baseUrl}${path}`,
      data: body ? body : undefined,
    };

    const response = await api.request<R>(config);
    return response.data;
  };

  return {
    getAll: (): Promise<T[]> => request("GET"),
    getOne: (id: string | number): Promise<T> => request("GET", `${id}/`),
    create: (data: Partial<T>): Promise<T> => request("POST", "", data),
    update: (id: string | number, data: Partial<T>): Promise<T> =>
      request("PUT", `${id}/`, data),
    delete: (id: string | number): Promise<void> => request("DELETE", `${id}/`),
  };
};

export const GameClient = createCrudClient<Game>({
  baseUrl: "/api/games/",
});
