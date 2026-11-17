export const Navbar = ({ setVista, vistaActual = 'inicio', totalItems = 0, onOpenCarrito, usuario, onLogout }) => {
  const opciones = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'armador', label: 'Armador' },
    { id: 'cotizaciones', label: 'Cotizaciones' },
    ...(usuario ? [{ id: 'pedidos', label: 'Mis Pedidos' }] : []),
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
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2 p-0">
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
        <nav className="d-flex flex-wrap align-items-center gap-2">
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

          {/* Botón Carrito */}
          <button
            type="button"
            className="btn btn-sm position-relative px-3 py-2 fw-bold d-flex align-items-center gap-2"
            style={{
              backgroundColor: totalItems > 0 ? '#00FF66' : '#111827',
              color: totalItems > 0 ? '#000000' : '#00FF66',
              border: '1px solid #00FF66',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              boxShadow: totalItems > 0 ? '0 0 12px rgba(0, 255, 102, 0.4)' : 'none'
            }}
            onClick={onOpenCarrito}
          >
            🛒 <span>Carrito</span>
            {totalItems > 0 && (
              <span 
                className="badge rounded-pill bg-dark text-white ms-1 fw-bold"
                style={{ fontSize: '0.75rem', border: '1px solid #00FF66' }}
              >
                {totalItems}
              </span>
            )}
          </button>

          {/* Iniciar / Cerrar Sesión */}
          {usuario ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger px-3 py-2 fw-bold"
              style={{ borderRadius: '6px' }}
              onClick={onLogout}
            >
              Cerrar Sesión ({usuario.nombre})
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-sm px-3 py-2 fw-bold"
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
          )}
        </nav>
      </div>
    </header>
  );
};