"use client";

import { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";

export default function UserProvider({ children }: { children: ReactNode }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      authorizationParams={{
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
        redirect_uri: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
      }}
    >
      <RecoilRoot>{children}</RecoilRoot>
    </Auth0Provider>
  );
}
