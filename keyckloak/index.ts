export const keycloakConfig = {
  url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}`,
  // url: 'http://192.168.0.107:8080',
  realm: "axis",
  clientId: "axis-frontend",
};
