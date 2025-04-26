// Tipizzazione api giochi

export type Game = {
  nome: string;
  min_giocatori: number;
  max_giocatori: number;
  anno_di_pubblicazione?: string;
  params: Array<string>;
  id?: number;
  descrizione?: string;
  autori?: string;
  pubblicato_da?: string;
  artisti?: string;
  immagine?: string;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type CrudClientOptions<T> = {
  baseUrl: string;
  headers?: HeadersInit;
};

export type SelectedGame = {
  id: number | string;
  name: string;
  yearPublished: number | string;
};
