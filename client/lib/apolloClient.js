import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_API}graphql/`, // e.g. https://www.myapi.com/api/v2
      headers: {
        'X-hasura-admin-secret': '<YOUR_HASURA_KEY>', // or any other values for the http request
        lang: 'en',
      },
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
