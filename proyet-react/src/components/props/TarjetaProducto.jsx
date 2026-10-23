export const TarjetaProducto = ({ nombre, precio, watts, imagen, categoria }) => {
  return (
    <div 
      className="card h-100 p-3 text-start" 
      style={{ 
        backgroundColor: '#111827', 
        border: '1px solid #1F2937', 
        borderRadius: '12px',
        transition: 'border-color 0.2s ease'
      }}
    >
      {/* Tags superiores */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="badge text-uppercase" style={{ backgroundColor: '#1F2937', color: '#00FF66' }}>
          {categoria || 'Hardware'}
        </span>
        {watts && (
          <span 
            className="badge fw-bold" 
            style={{ backgroundColor: 'rgba(0, 255, 102, 0.15)', color: '#00FF66', border: '1px solid #00FF66' }}
          >
            ⚡ {watts}W
          </span>
        )}
      </div>

      {/* Visor de Imagen */}
      <div 
        className="p-3 text-center mb-3 rounded d-flex align-items-center justify-content-center" 
        style={{ backgroundColor: '#0B0F19', minHeight: '180px' }}
      >
        <img 
          src={imagen || 'https://via.placeholder.com/180'} 
          alt={nombre} 
          className="img-fluid"
          style={{ maxHeight: '150px', objectFit: 'contain' }}
        />
      </div>

      {/* Información de Precio y Botón */}
      <div className="card-body p-0 d-flex flex-column justify-content-between">
        <div>
          <h5 className="fw-bold text-white mb-2">{nombre}</h5>
        </div>
        <div className="mt-3">
          <div className="fs-4 fw-bold mb-3" style={{ color: '#00FF66' }}>
            ${precio ? precio.toLocaleString('es-CL') : '0'} CLP
          </div>
          <button 
            type="button"
            className="btn w-100 fw-bold py-2"
            style={{ backgroundColor: '#00FF66', color: '#000000', border: 'none', borderRadius: '6px' }}
          >
            Agregar ⚡
          </button>
        </div>
      </div>
    </div>
  );
};