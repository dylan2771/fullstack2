export const Footer = () => {
  return (
    <footer 
      className="footer-principal text-center py-4 mt-auto" 
      style={{ backgroundColor: '#0B0F19', borderTop: '1px solid #1F2937' }}
    >
      <div className="container">
        <p className="mb-1 text-white fw-medium">
          &copy; 2026 BuildMyPC - Todos los derechos reservados.
        </p>
        <p className="mb-0 text-secondary small">
          Desarrollado por Joaquín Ferrada, Maximiliano Veas y Dylan Navarrete.
        </p>
      </div>
    </footer>
  );
};