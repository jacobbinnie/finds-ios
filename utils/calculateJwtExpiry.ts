import { jwtDecode } from "jwt-decode";

export const calculateJwtExpiry = (jwt: string) => {
  const decodedJwt = jwtDecode(jwt);
  if (decodedJwt.exp) {
    return decodedJwt.exp * 1000 - Date.now();
  } else {
    return null;
  }
};
