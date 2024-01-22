import { UsersApi, PlacesApi, AuthApi, FindsApi } from "../.generated";

const BASE_URL = "http://localhost:3000";

export const usersApi = new UsersApi({
  basePath: BASE_URL,
  isJsonMime: () => true,
});

export const findsApi = new FindsApi({
  basePath: BASE_URL,
  isJsonMime: () => true,
});

export const placesApi = new PlacesApi({
  basePath: BASE_URL,
  isJsonMime: () => true,
});

export const authApi = new AuthApi({
  basePath: BASE_URL,
  isJsonMime: () => true,
});
