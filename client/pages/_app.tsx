import '../sass/main.scss'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from "next/router"
import { ApolloProvider } from "@apollo/client"
import { getApolloClient } from "./api/apollo-client"
import Layout from "../components/Layout"

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())
NProgress.configure({ showSpinner: false });



const MyApp = ({ Component, pageProps }: AppProps) => {

  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default MyApp;