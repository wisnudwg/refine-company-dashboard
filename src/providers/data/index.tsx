import graphQLDataProvider, { GraphQLClient, liveProvider as graphQLLiveProvider } from "@refinedev/nestjs-query";

import { fetchWrapper } from "./fetchWrapper";
import { createClient } from "graphql-ws";

export const DOMAIN_NAME = 'api.crm.refine.dev';
export const API_BASE_URL = `https://${DOMAIN_NAME}`;
export const API_URL = `${API_BASE_URL}/graphql`;
export const WS_URL = `wss://${DOMAIN_NAME}/graphql`;


export const client = new GraphQLClient(API_URL, {
  fetch: (url: string, options: RequestInit) => {
    try {
      return fetchWrapper(url, options);
    } catch (error) {
      return Promise.reject(error as Error);
    }
  },
});

export const wsClient = typeof window === undefined ? undefined : createClient({
  url: WS_URL,
  connectionParams: () => {
    const accessToken = localStorage.getItem("access_token");

    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  },
});

export const dataProvider = graphQLDataProvider(client);
export const liveProvider = wsClient ? graphQLLiveProvider(wsClient) : undefined;