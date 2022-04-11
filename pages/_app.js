import '../styles/globals.css'
import client from '../config/apollo-client'
import { ApolloProvider } from "@apollo/client";
import "../public/assets/css/bootstrap.css"
import '../styles/estilos.css'
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client} >
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp
