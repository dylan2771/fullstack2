export default function VideoNativo() {
  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <video controls width="100%" style={{ maxWidth: '800px', borderRadius: '8px' }}>
        <source src="/video.mov" type="video/quicktime" />
        <source src="/video.mov" type="video/mp4" />
        Tu navegador no soporta la reproducción de este video.
      </video>
    </div>
  );
}