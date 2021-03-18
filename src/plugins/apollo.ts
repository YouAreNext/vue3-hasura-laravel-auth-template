import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  concat
} from "@apollo/client/core";

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("AUTH_TOKEN");
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
  return forward(operation);
});

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "http://localhost:8080/v1/graphql"
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: concat(middlewareLink, httpLink),
  cache
});

export default apolloClient;
