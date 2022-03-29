import '../sass/main.scss'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from "next/router"
import client from "./api/apollo-client"
import { ApolloProvider } from "@apollo/client";

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false });


const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;