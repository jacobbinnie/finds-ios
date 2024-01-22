import axios from "axios";
import { FindsApi, PlacesApi, UsersApi } from "./generated";

const instance = axios.create();

const BASE_URL = "http://localhost:4499";

export const findsApi = new FindsApi(undefined, BASE_URL, instance);

export const placesApi = new PlacesApi(undefined, BASE_URL, instance);

export const usersApi = new UsersApi(undefined, BASE_URL, instance);
