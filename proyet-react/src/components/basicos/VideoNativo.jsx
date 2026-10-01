export const VideoNativo = () => {
  return (
    <div className="contenedor-video">
      <video controls width="100%" poster="/img/pc_portada.jpg">
        <source src="/rtx50.mov" type="video/mp4" />
        Tu navegador no soporta la reproducción de video HTML5.
      </video>
    </div>
  );
};