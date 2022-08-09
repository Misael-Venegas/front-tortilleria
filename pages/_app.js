import '../styles/globals.css'
import client from '../config/apollo-client'
import { ApolloProvider } from "@apollo/client";
import "../public/assets/css/bootstrap.css"
import '../styles/estilos.css'
import "../styles/scrollTablaAlmacen.css";
import "../styles/scrollThin.css";
import "../styles/loader.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import Provider from '../components/context/Provider';
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client} >
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}

export default MyApp
