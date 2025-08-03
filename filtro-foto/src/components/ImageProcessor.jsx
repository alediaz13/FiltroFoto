import { useState, useEffect } from 'react'
import { applyGradientEffect } from '../utils/imageEffects'
import styles from './ImageProcessor.module.css'

const ImageProcessor = ({ images, gradientIntensity, onImageProcessed }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedCount, setProcessedCount] = useState(0)
  const [processedImageIds] = useState(new Set())

  useEffect(() => {
    // Solo procesar si hay imágenes y no está procesando actualmente
    if (images.length > 0 && !isProcessing) {
      setIsProcessing(true)
      setProcessedCount(0)
      processedImageIds.clear()

      const processImages = async () => {
        for (let i = 0; i < images.length; i++) {
          const image = images[i]
          
          // Evitar procesar la misma imagen con la misma intensidad
          const imageKey = `${image.id}-${gradientIntensity}`
          if (processedImageIds.has(imageKey)) {
            continue
          }

          try {
            const processedImageData = await applyGradientEffect(image.file, gradientIntensity)
            onImageProcessed(image, processedImageData)
            processedImageIds.add(imageKey)
            setProcessedCount(prev => prev + 1)
            
            // Pequeña pausa para mostrar el progreso
            await new Promise(resolve => setTimeout(resolve, 200))
          } catch (error) {
            console.error('Error procesando imagen:', error)
          }
        }
        
        // Procesamiento completado
        setIsProcessing(false)
      }

      processImages()
    }
  }, [images, gradientIntensity, onImageProcessed]) // Removido isProcessing de las dependencias

  // No mostrar nada si no hay procesamiento
  if (!isProcessing) {
    return null
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.imageProcessor}>
          <div className={styles.processingStatus}>
            <h3>
              {processedCount === 0 
                ? 'Procesando...' 
                : `${processedCount} imagen(es) procesada(s)`
              }
            </h3>
            <div className={styles.progressBar}>
              <div 
                className={`${styles.progressFill} ${isProcessing ? styles.processing : styles.completed}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageProcessor 