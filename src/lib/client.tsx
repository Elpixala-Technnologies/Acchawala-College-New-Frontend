"use client";
import { BASE_GQL_URL } from "@/utils/network/network";

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { setContext } from "@apollo/client/link/context";
import { store } from "@/Redux"; // Path to your Redux store

function makeClient() {
  const httpLink = new HttpLink({
    uri: BASE_GQL_URL,
    fetchOptions: { cache: "no-store" },
  });

  // Set up the authorization link with JWT token
  const authLink = setContext((_, { headers }) => {
    const state = store.getState();
    const token = state.auth.token; // Get token from Redux state

    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
