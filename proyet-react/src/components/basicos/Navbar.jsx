export const Navbar = ({ setVista, vistaActual = 'inicio', totalItems = 0, onOpenCarrito }) => {
  const opciones = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'armador', label: 'Armador' },
    { id: 'cotizaciones', label: 'Cotizaciones' },
  ];

  return (
    <header 
      className="sticky-top px-3 px-md-4 py-2"
      style={{ 
        backgroundColor: '#080C14', 
        borderBottom: '1px solid #1F2937',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
      }}
    >
      <div className="container d-flex align-items-center justify-content-between p-0">
        {/* Logo Gamer */}
        <div 
          className="d-flex align-items-center gap-2" 
          style={{ cursor: 'pointer' }} 
          onClick={() => setVista('inicio')}
        >
          <span className="fs-3 fw-bold" style={{ color: '#00FF66', letterSpacing: '-0.5px' }}>
            ⚡ BuildMyPC
          </span>
        </div>

        {/* Navegación y Botones */}
        <nav className="d-flex align-items-center gap-2">
          {opciones.map((item) => {
            const esActivo = vistaActual === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className="btn btn-sm px-3 py-2 fw-bold"
                style={{
                  backgroundColor: esActivo ? '#00FF66' : 'transparent',
                  color: esActivo ? '#000000' : '#E5E7EB',
                  border: 'none',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setVista(item.id)}
              >
                {item.label}
              </button>
            );
          })}

          {/* Botón Carrito de Compras */}
          <button
            type="button"
            className="btn btn-sm position-relative ms-1 px-3 py-2 fw-bold"
            style={{
              backgroundColor: '#111827',
              color: '#00FF66',
              border: '1px solid #00FF66',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onClick={onOpenCarrito}
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span 
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{ backgroundColor: '#00FF66', color: '#000000', fontSize: '0.75rem' }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Iniciar Sesión Destacado */}
          <button
            type="button"
            className="btn btn-sm ms-2 px-3 py-2 fw-bold"
            style={{
              backgroundColor: vistaActual === 'login' || vistaActual === 'auth' ? '#00FF66' : '#111827',
              color: vistaActual === 'login' || vistaActual === 'auth' ? '#000000' : '#00FF66',
              border: '1px solid #00FF66',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}
            onClick={() => setVista('login')}
          >
            Iniciar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};