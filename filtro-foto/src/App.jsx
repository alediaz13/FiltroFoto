import { useState } from 'react'
import ImageUploader from './components/ImageUploader'
import ImageProcessor from './components/ImageProcessor'
import ProcessedImages from './components/ProcessedImages'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [processedImages, setProcessedImages] = useState([])
  const [gradientIntensity, setGradientIntensity] = useState(0.7)

  const handleImagesUpload = (uploadedImages) => {
    setImages(uploadedImages)
    setProcessedImages([])
  }

  const handleImageProcessed = (originalImage, processedImageData) => {
    setProcessedImages(prev => {
      // Evitar duplicados basados en el ID de la imagen original
      const exists = prev.some(item => item.original.id === originalImage.id)
      if (exists) {
        // Reemplazar la imagen existente con la nueva versión procesada
        return prev.map(item => 
          item.original.id === originalImage.id 
            ? { original: originalImage, processed: processedImageData }
            : item
        )
      } else {
        // Agregar nueva imagen procesada
        return [...prev, { original: originalImage, processed: processedImageData }]
      }
    })
  }

  const handleDownloadAll = () => {
    processedImages.forEach((item, index) => {
      const link = document.createElement('a')
      link.download = `filtro-foto-${index + 1}.png`
      link.href = item.processed
      link.click()
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-icon">📸</div>
          <div>
            <h1>FiltroFoto Pro</h1>
            <p>Transforma tus imágenes con estilo</p>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="upload-section">
          <ImageUploader 
            onImagesUpload={handleImagesUpload}
            maxFiles={10}
          />
        </section>

        {images.length > 0 && (
          <section className="controls-section">
            <div className="controls">
              <div className="intensity-control">
                <label htmlFor="intensity">Intensidad del degradado:</label>
                <input
                  id="intensity"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={gradientIntensity}
                  onChange={(e) => setGradientIntensity(parseFloat(e.target.value))}
                />
                <span>{Math.round(gradientIntensity * 100)}%</span>
              </div>
            </div>
          </section>
        )}

        {processedImages.length > 0 && (
          <section className="results-section">
            <ProcessedImages
              processedImages={processedImages}
              onDownloadAll={handleDownloadAll}
            />
          </section>
        )}
      </main>

      {/* Modal de procesamiento - fuera del main para que aparezca sobre todo */}
      <ImageProcessor
        images={images}
        gradientIntensity={gradientIntensity}
        onImageProcessed={handleImageProcessed}
      />

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} FiltroFoto Pro - Todos los derechos reservados</p>
      </footer>
    </div>
  )
}

export default App
