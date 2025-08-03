# 📸 Filtro Foto

Una aplicación web moderna para aplicar efectos de degradado negro con logo a tus imágenes. Desarrollada con React 19, Vite y CSS Modules.

## ✨ Características

- **Drag & Drop**: Sube imágenes arrastrándolas o haciendo clic
- **Múltiples formatos**: Soporta JPG y PNG
- **Hasta 10 imágenes**: Procesa múltiples imágenes a la vez
- **Degradado ajustable**: Controla la intensidad del efecto con un slider
- **Logo automático**: Agrega un logo en la esquina inferior izquierda
- **Calidad preservada**: Mantiene la calidad original de las imágenes
- **Descarga individual**: Descarga cada imagen por separado
- **Descarga masiva**: Descarga todas las imágenes procesadas
- **Diseño responsive**: Funciona perfectamente en móviles y desktop

## 🎨 Efecto Aplicado

- **Degradado negro**: De abajo hacia arriba (no llega a la mitad de la imagen)
- **Opacidad ajustable**: Controla la intensidad del degradado (0-100%)
- **Logos**: fes.svg (esquina inferior izquierda) y www.svg (esquina inferior derecha)

## 🚀 Tecnologías Utilizadas

- **React 19**: Framework de JavaScript
- **Vite**: Build tool rápido
- **CSS Modules**: Estilos modulares
- **React Dropzone**: Drag & drop de archivos
- **Canvas API**: Procesamiento de imágenes en el navegador

## 📦 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <tu-repositorio>
   cd filtro-foto
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Ejecuta en modo desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abre tu navegador en:**
   ```
   http://localhost:5173
   ```

## 🛠️ Scripts Disponibles

- `npm run dev` - Ejecuta en modo desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza la build de producción

## 📱 Cómo Usar

1. **Sube imágenes**: Arrastra y suelta hasta 10 imágenes JPG o PNG
2. **Ajusta la intensidad**: Usa el slider para controlar el degradado
3. **Procesa**: Las imágenes se procesan automáticamente
4. **Descarga**: Descarga individual o todas las imágenes procesadas

## 🎯 Funcionalidades Técnicas

### Procesamiento de Imágenes

- Utiliza Canvas API para manipulación de imágenes
- Preserva la resolución original
- Aplica degradado lineal de abajo hacia arriba
- Agrega logo con contorno para mejor visibilidad

### Interfaz de Usuario

- Diseño moderno con gradientes y efectos glassmorphism
- Animaciones suaves y feedback visual
- Responsive design para todos los dispositivos
- CSS Modules para estilos encapsulados

### Gestión de Archivos

- Validación de tipos de archivo (solo JPG/PNG)
- Límite de 10 archivos máximo
- Procesamiento asíncrono para mejor rendimiento
- Descarga automática con nombres únicos

## 🔧 Personalización

### Cambiar los Logos

Para cambiar los logos, edita la función `addLogo` en `src/utils/imageEffects.js`:

```javascript
// Logo izquierdo - FES (esquina inferior izquierda)
logoLeft.src = "/fes.svg";

// Logo derecho - WWW (esquina inferior derecha)
logoRight.src = "/www.svg";

// Ajustar el tamaño de ambos logos
const logoSize = Math.min(canvasWidth, canvasHeight) * 0.4; // 40% del tamaño

// Ajustar la posición (padding más pequeño = más abajo)
const padding = logoSize * 0.2;
```

### Ajustar el Degradado

Para modificar el degradado, edita en `src/utils/imageEffects.js`:

```javascript
// Cambia 0.4 para ajustar hasta dónde llega el degradado
const gradient = ctx.createLinearGradient(
  0,
  canvas.height,
  0,
  canvas.height * 0.4
);
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

**Desarrollado con ❤️ usando React 19 y Vite**
