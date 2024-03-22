import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Amplify } from 'aws-amplify';

import ErrorPage from "./pages/ErrorPage.tsx";
import { sentryConfig } from "./utils/sentryConfig.ts";
import { urlGenerator } from "./utils/util.ts";
import AppProvider from "./providers/AppProvider.tsx";
import { authConfig } from "./auth/authConfig.ts";
import LoginPage from "./pages/LoginPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import RoomResultsPage from "./components/searchpage/RoomResultpage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

const client = new ApolloClient({
  uri: urlGenerator(`${process.env.GRAPHQL_PATH}`),
  cache: new InMemoryCache(),
});

Amplify.configure(authConfig);

// Check if the environment is production
const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // sentryConfig();
}

// React Router DOM Router Config
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/room-result",
        element: <SearchPage />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
);
