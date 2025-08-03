import styles from './ProcessedImages.module.css'

const ProcessedImages = ({ processedImages, onDownloadAll, isDownloading }) => {
  const handleDownload = (imageData, index) => {
    const link = document.createElement('a')
    link.download = `filtro-foto-${index + 1}.png`
    link.href = imageData.processed
    
    // Agregar al DOM temporalmente para mejor compatibilidad
    document.body.appendChild(link)
    link.click()
    
    // Remover del DOM
    document.body.removeChild(link)
  }

  return (
    <div className={styles.processedImages}>
      <div className={styles.imagesHeader}>
        <h3>Imágenes Procesadas ({processedImages.length})</h3>
        <button 
          className={`${styles.downloadAllBtn} ${isDownloading ? styles.downloading : ''}`} 
          onClick={onDownloadAll}
          disabled={isDownloading}
        >
          {isDownloading ? '⏳ Descargando...' : '⬇️ Descargar Todas'}
        </button>
      </div>
      
      <div className={styles.imagesGrid}>
        {processedImages.map((imageData, index) => (
          <div key={index} className={styles.imageItem}>
            <div className={styles.imageContainer}>
              <img 
                src={imageData.processed} 
                alt={`Imagen procesada ${index + 1}`}
                className={styles.processedImage}
              />
              <div className={styles.imageOverlay}>
                <button 
                  className={styles.downloadBtn}
                  onClick={() => handleDownload(imageData, index)}
                >
                  ⬇️ Descargar
                </button>
              </div>
            </div>
            <p className={styles.imageName}>{imageData.original.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProcessedImages 