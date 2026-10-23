export function Cotizaciones({ setVista }) {
  return (
    <main className="container py-5">
      {/* Encabezado */}
      <div className="mb-4 text-start">
        <span 
          className="badge mb-2 px-3 py-2 fw-bold" 
          style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}
        >
          📄 Historial de Presupuestos
        </span>
        <h1 className="display-5 fw-bold mb-2" style={{ color: '#00FF66' }}>
          Mis Cotizaciones
        </h1>
        <p className="text-secondary fs-5 mb-0">
          Gestiona y revisa los presupuestos guardados de tus configuraciones de PC.
        </p>
      </div>

      {/* Contenedor de Estado Vacío */}
      <div 
        className="card p-5 text-center my-4" 
        style={{ 
          backgroundColor: '#111827', 
          border: '2px dashed #1F2937', 
          borderRadius: '12px' 
        }}
      >
        <div className="fs-1 mb-3" style={{ color: '#00FF66' }}>📋</div>
        <h4 className="text-white fw-bold mb-2">No tienes cotizaciones guardadas</h4>
        <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '480px' }}>
          Aún no has generado ningún presupuesto. Configura tu equipo en el armador para validar componentes, consumo en Watts y guardar tu cotización.
        </p>
        
        {setVista && (
          <div>
            <button 
              type="button" 
              className="btn fw-bold px-4 py-2" 
              style={{ backgroundColor: '#00FF66', color: '#000000', border: 'none' }}
              onClick={() => setVista('armador')}
            >
              Crear Nueva Cotización 
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cotizaciones;