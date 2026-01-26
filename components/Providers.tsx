"use client";

import React, { useState, useEffect } from "react";
import { ReactKeycloakProvider } from "@react-keycloak/web";
// Используем максимально точные пути для устранения ошибок разрешения модулей
import keycloak from "../keyckloak/index";
import { Provider } from "react-redux";
import { store } from "../storage/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/react-query/queryClient";

/**
 * Провайдеры приложения с исправленными путями и логикой инициализации.
 */
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Предотвращаем рендеринг на сервере, так как Keycloak требует window
  if (!mounted || !keycloak) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactKeycloakProvider
          authClient={keycloak}
          initOptions={{
            onLoad: "login-required",
            checkLoginIframe: true,
            pkceMethod: "S256",
            flow: "standard",
          }}
          onEvent={(event, error) => {
            console.log('Keycloak Event:', event);
            if (error) {
              console.error('Keycloak Error Details:', error);
            }
          }}
        >
          {children}
        </ReactKeycloakProvider>
      </QueryClientProvider>
    </Provider>
  );
};
