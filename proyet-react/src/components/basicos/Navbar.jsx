export const Navbar = ({ setVista }) => {
  return (
    <header className="header-principal">
      <div className="logo" style={{ cursor: 'pointer' }} onClick={() => setVista('inicio')}>
        <h1>BuildMyPC</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li><button type="button" onClick={() => setVista('inicio')}>Inicio</button></li>
          <li><button type="button" onClick={() => setVista('catalogo')}>Catálogo</button></li>
          <li><button type="button" onClick={() => setVista('armador')}>Armador</button></li>
          <li><button type="button" onClick={() => setVista('cotizaciones')}>Cotizaciones</button></li>
          <li><button type="button" onClick={() => setVista('login')}>Iniciar Sesión</button></li>
        </ul>
      </nav>
    </header>
  );
};