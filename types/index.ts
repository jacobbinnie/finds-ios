import axios from "axios";
import { AuthApi, FindsApi, PlacesApi, SavesApi, UsersApi } from "./generated";
import { useAuth } from "@/providers/AuthProvider";

const instance = axios.create();

// This handles adding auth to the request
// instance.interceptors.request.use(
//   (config) =>
//     new Promise((resolve) => {
//       void Auth.getToken().then((token) => {
//         if (token && config.headers) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//         resolve(config);
//       });
//     })
// );

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const findsApi = new FindsApi(undefined, BASE_URL, instance);

export const placesApi = new PlacesApi(undefined, BASE_URL, instance);

export const usersApi = new UsersApi(undefined, BASE_URL, instance);

export const authApi = new AuthApi(undefined, BASE_URL, instance);

export const savesApi = new SavesApi(undefined, BASE_URL, instance);
