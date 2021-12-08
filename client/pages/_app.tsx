import '../sass/main.scss'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from "next/router"
import { ApolloProvider } from "@apollo/client";
import client from "./api/apollo-client";

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false });

import { useApollo } from '../lib/apollo';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;