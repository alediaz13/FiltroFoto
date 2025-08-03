import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styles from './ImageUploader.module.css'

const ImageUploader = ({ onImagesUpload, maxFiles = 10 }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/') && 
      (file.type === 'image/jpeg' || file.type === 'image/png')
    )

    if (imageFiles.length > maxFiles) {
      alert(`Puedes subir máximo ${maxFiles} imágenes`)
      return
    }

    const imageObjects = imageFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type
    }))

    onImagesUpload(imageObjects)
  }, [onImagesUpload, maxFiles])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    multiple: true
  })

  return (
    <div className={styles.imageUploader}>
      <div 
        {...getRootProps()} 
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} />
        <div className={styles.uploadContent}>
          <div className={styles.uploadIcon}>📸</div>
          {isDragActive ? (
            <p>Suelta las imágenes aquí...</p>
          ) : (
            <>
              <p>Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
              <p className={styles.uploadHint}>
                Formatos: JPG, PNG | Máximo: {maxFiles} imágenes
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUploader 