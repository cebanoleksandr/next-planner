import Keycloak, { KeycloakInitOptions } from "keycloak-js";

const keycloakConfig = {
  url: `${process.env.VITE_BASE_URL}:8180/`,
  realm: 'axis',
  clientId: 'axis-frontend',
};

export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "login-required",
  checkLoginIframe: true,
  pkceMethod: "S256",
  flow: "standard",
};

export const keycloak = new Keycloak(keycloakConfig);
