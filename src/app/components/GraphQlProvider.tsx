"use client";

import { mainGqlClient } from "@/helpers/gql.setup";
import { ApolloProvider } from "@apollo/client";

interface IGraphQlProviderProps {
  children: React.ReactNode;
}

const GraphQlProvider: React.FC<IGraphQlProviderProps> = ({ children }) => {
  return <ApolloProvider client={mainGqlClient}>{children}</ApolloProvider>;
};

export default GraphQlProvider;
