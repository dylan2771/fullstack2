export function Cotizaciones() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Mis Cotizaciones</h2>
      <p>Aquí se guardarán las cotizaciones y presupuestos que armes para tu PC.</p>
      <div style={{ marginTop: '20px', padding: '20px', border: '1px dashed #ccc', borderRadius: '8px' }}>
        <p><em>No tienes cotizaciones guardadas por el momento.</em></p>
      </div>
    </div>
  );
}

export default Cotizaciones;