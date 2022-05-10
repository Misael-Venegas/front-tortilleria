import Head from "next/head";
import Header from "./Header";
const Layout = ({ children }) => {

  return (
    <>

      <Head>
        <title>Tortilleria rio azul</title>
      </Head>

      <Header />
      <div className="container shadow pt-1 mt-2 bg-white rounded" style={{ minHeight: '90vh' }}>

        {children}

      </div>

    </>
  );
};

export default Layout;
