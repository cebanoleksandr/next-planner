'use client';

import { keycloak, keycloakInitOptions } from "@/keyckloak";
import { store } from "@/storage/store";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { Provider } from "react-redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
        {children}
      </ReactKeycloakProvider>
    </Provider>
  );
};

export default Providers;
