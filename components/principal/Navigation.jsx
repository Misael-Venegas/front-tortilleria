import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/almacen">
                <a className="nav-link">Almacen</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/productos">
                <a className="nav-link">Productos</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services">
                <a className="nav-link">Mermas</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services">
                <a className="nav-link">Ventas</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services">
                <a className="nav-link">Corte de Caja</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services">
                <a className="nav-link">Gastos Operación</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/services">
                <a className="nav-link">Usuarios</a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="btn btn-secondary btn-sm my-2 my-sm-0">
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
