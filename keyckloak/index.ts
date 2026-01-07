import Keycloak from "keycloak-js";

const isServer = typeof window === "undefined";

const keycloak = !isServer 
  ? new Keycloak({
      url: "http://localhost:8180/",
      realm: "axis",
      clientId: "axis-frontend",
    })
  : null;

export default keycloak as Keycloak;
