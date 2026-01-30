"use client";

import React, { useState, useEffect } from "react";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import Keycloak from "keycloak-js";
import { keycloakConfig } from "../keyckloak/index";
import { Provider } from "react-redux";
import { store } from "../storage/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/react-query/queryClient";
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

const AuthLoading = ({ children }: { children: React.ReactNode }) => {
  const { initialized } = useKeycloak();

  if (!initialized) {
    return null;
  }

  return <>{children}</>;
};

interface ProvidersProps {
  messages: AbstractIntlMessages;
  locale: string;
}

export const Providers = ({ children, messages, locale }: { children: React.ReactNode } & ProvidersProps) => {
  const [mounted, setMounted] = useState(false);
  const [keycloakClient] = useState(() => new Keycloak(keycloakConfig));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ReactKeycloakProvider
      authClient={keycloakClient}
      initOptions={{
        onLoad: "login-required",
        checkLoginIframe: false,
        pkceMethod: "S256",
        flow: "standard",
      }}
      autoRefreshToken={true}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <AuthLoading>
              {children}
            </AuthLoading>
          </NextIntlClientProvider>
        </QueryClientProvider>
      </Provider>
    </ReactKeycloakProvider>
  );
};
