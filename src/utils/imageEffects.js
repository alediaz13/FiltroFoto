// Función para aplicar el efecto de degradado negro y logo
export const applyGradientEffect = async (imageFile, gradientIntensity) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      // Configurar el canvas con las dimensiones de la imagen
      canvas.width = img.width
      canvas.height = img.height

      // Dibujar la imagen original
      ctx.drawImage(img, 0, 0)

      // Crear el degradado negro de abajo hacia arriba
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height * 0.4)
      gradient.addColorStop(0, `rgba(0, 0, 0, ${gradientIntensity})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      // Aplicar el degradado
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Agregar el logo en la esquina inferior izquierda
      addLogo(ctx, canvas.width, canvas.height).then(() => {
        // Convertir el canvas a blob
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          resolve(url)
        }, 'image/png', 1.0)
      })
    }

    img.onerror = () => {
      reject(new Error('Error al cargar la imagen'))
    }

    img.src = URL.createObjectURL(imageFile)
  })
}

// Función para agregar los dos logos con posiciones fijas
const addLogo = (ctx, canvasWidth, canvasHeight) => {
  return new Promise((resolve) => {
    let logosLoaded = 0
    const totalLogos = 2
    
    const checkAllLogosLoaded = () => {
      logosLoaded++
      if (logosLoaded === totalLogos) {
        resolve()
      }
    }
    
    // Logo 1: fes.svg - Esquina inferior izquierda con márgenes fijos
    const logoLeft = new Image()
    logoLeft.onload = () => {
      // Tamaño relativo al tamaño de la imagen (para que se vea consistente)
      const logoSize = Math.min(canvasWidth, canvasHeight) * 0.24 // 8% del tamaño mínimo
      const logoAspectRatio = logoLeft.width / logoLeft.height
      const logoWidth = logoSize
      const logoHeight = logoSize / logoAspectRatio
      
      // Posición relativa: 10% desde la izquierda y 10% desde abajo
      const marginLeft = canvasWidth * 0.1 // 10% del ancho
      const marginBottom = canvasHeight * 0.1 // 10% del alto
      const x = marginLeft
      const y = canvasHeight - marginBottom - logoHeight
      
      // Dibujar logo izquierdo (sin fondo)
      ctx.drawImage(logoLeft, x, y, logoWidth, logoHeight)
      
      checkAllLogosLoaded()
    }
    
    logoLeft.onerror = () => {
      // Fallback para logo izquierdo
      const logoText = 'FES'
      const logoSize = Math.min(canvasWidth, canvasHeight) * 0.07 // 6% del tamaño mínimo
      
      ctx.font = `bold ${logoSize}px Arial`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.lineWidth = 2
      
      const marginLeft = canvasWidth * 0.1 // 10% del ancho
      const marginBottom = canvasHeight * 0.1 // 10% del alto
      const x = marginLeft
      const y = canvasHeight - marginBottom
      
      ctx.strokeText(logoText, x, y)
      ctx.fillText(logoText, x, y)
      
      checkAllLogosLoaded()
    }
    
    // Logo 2: www.svg - Esquina inferior derecha con márgenes fijos
    const logoRight = new Image()
    logoRight.onload = () => {
      // Tamaño relativo al tamaño de la imagen (para que se vea consistente)
      const logoSize = Math.min(canvasWidth, canvasHeight) * 0.19 // 6% del tamaño mínimo
      const logoAspectRatio = logoRight.width / logoRight.height
      const logoWidth = logoSize
      const logoHeight = logoSize / logoAspectRatio
      
      // Posición relativa: 10% desde la derecha y 10% desde abajo
      const marginRight = canvasWidth * 0.1 // 10% del ancho
      const marginBottom = canvasHeight * 0.1 // 10% del alto
      const x = canvasWidth - marginRight - logoWidth
      const y = canvasHeight - marginBottom - logoHeight
      
      // Dibujar logo derecho (sin fondo)
      ctx.drawImage(logoRight, x, y, logoWidth, logoHeight)
      
      checkAllLogosLoaded()
    }
    
    logoRight.onerror = () => {
      // Fallback para logo derecho
      const logoText = 'WWW'
      const logoSize = Math.min(canvasWidth, canvasHeight) * 0.19 // 6% del tamaño mínimo
      
      ctx.font = `bold ${logoSize}px Arial`
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)'
      ctx.lineWidth = 2
      
      const marginRight = canvasWidth * 0.1 // 10% del ancho
      const marginBottom = canvasHeight * 0.1 // 10% del alto
      const textWidth = ctx.measureText(logoText).width
      const x = canvasWidth - marginRight - textWidth
      const y = canvasHeight - marginBottom
      
      ctx.strokeText(logoText, x, y)
      ctx.fillText(logoText, x, y)
      
      checkAllLogosLoaded()
    }
    
    // Cargar ambos logos
    logoLeft.src = '/fes.svg'     // Logo FES en la izquierda
    logoRight.src = '/www.svg'    // Logo WWW en la derecha
  })
}

// Función para limpiar URLs de objetos creados
export const cleanupImageUrl = (url) => {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
} 