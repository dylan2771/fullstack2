export const Navbar = () => {
  return (
    <header className="header-principal">
      <div className="logo">
        <h1>BuildMyPC</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#catalogo">Catálogo</a></li>
          <li><a href="#armador">Armador</a></li>
          <li><a href="#cotizaciones">Cotizaciones</a></li>
          <li><a href="#login">Iniciar Sesión</a></li>
        </ul>
      </nav>
    </header>
  );
};