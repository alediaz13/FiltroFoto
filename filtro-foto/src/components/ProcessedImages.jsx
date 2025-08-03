import { cleanupImageUrl } from '../utils/imageEffects'
import styles from './ProcessedImages.module.css'

const ProcessedImages = ({ processedImages, onDownloadAll }) => {
  const handleDownload = (imageData, index) => {
    const link = document.createElement('a')
    link.download = `filtro-foto-${index + 1}.png`
    link.href = imageData.processed
    link.click()
  }

  return (
    <div className={styles.processedImages}>
      <div className={styles.imagesHeader}>
        <h3>Imágenes Procesadas ({processedImages.length})</h3>
        <button className={styles.downloadAllBtn} onClick={onDownloadAll}>
          Descargar Todas
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