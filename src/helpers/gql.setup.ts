import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const API_URL = process.env.API_URL || 'http://localhost:3000'

const httpGqlLink = new HttpLink({
    uri: `${API_URL}/graphql`
})

export const mainGqlClient = new ApolloClient({
    link: httpGqlLink,
    cache: new InMemoryCache()
})