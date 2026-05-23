# GUAPO — Art Gallery

Landing page estática para GUAPO Art Gallery.  
Stack: HTML + CSS + JS vanilla. Sin dependencias, sin build step.

---

## Estructura del proyecto

```
guapo/
├── index.html      # Página principal
├── style.css       # Estilos globales
├── main.js         # Interactividad (cursor, slideshow, scroll)
├── favicon.svg     # Ícono del sitio
├── vercel.json     # Configuración de Vercel
└── README.md       # Este archivo
```

---

## Deploy en Vercel + dominio personalizado

### 1 · GitHub
```bash
# En tu carpeta Downloads
cd ~/Downloads/guapo
git init
git add .
git commit -m "feat: initial GUAPO landing"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/guapo.git
git push -u origin main
```

### 2 · Vercel
1. Ir a [vercel.com](https://vercel.com) → **New Project**
2. Importar el repo `guapo` desde GitHub
3. Framework Preset → **Other** (no framework)
4. Root Directory → `/` (dejar por defecto)
5. Click **Deploy** ✅

### 3 · Dominio personalizado en Vercel
1. En el proyecto Vercel → **Settings → Domains**
2. Agregar: `guapo.igapp.cl`
3. Agregar: `www.guapo.igapp.cl`
4. Vercel te dará un valor **CNAME** → copiarlo

### 4 · Cloudflare DNS
Crear dos registros CNAME en Cloudflare para `igapp.cl`:

| Tipo  | Nombre          | Destino                      | Proxy |
|-------|-----------------|------------------------------|-------|
| CNAME | `guapo`         | `cname.vercel-dns.com`       | ☁️ ON  |
| CNAME | `www.guapo`     | `cname.vercel-dns.com`       | ☁️ ON  |

> ⚠️ Si Vercel pide verificación, puede que necesites apagar el proxy de Cloudflare temporalmente (ícono naranja → gris) durante la verificación del dominio, luego volver a encenderlo.

---

## Personalización rápida

### Cambiar imágenes
Editar `index.html` → buscar las etiquetas `<img>` con las URLs de Squarespace y reemplazar por tus propias URLs.

### Cambiar artistas
En `index.html` buscar la sección `<section class="artists-section">` y editar los `.artist-card`.

### Cambiar colores
En `style.css` editar las variables al inicio:
```css
:root {
  --black: #0a0a0a;
  --white: #f5f0e8;
  --accent: #c8a96e;   /* ← color dorado principal */
}
```

### Cambiar textos
Todo el contenido está en `index.html`, buscar y reemplazar directamente.

---

## Notas
- Las fuentes se cargan desde Google Fonts (requiere conexión a internet).
- Las imágenes actuales vienen del CDN de Squarespace original — reemplazar por imágenes propias para producción.
- El cursor personalizado solo aparece en desktop (se oculta en dispositivos táctiles automáticamente).
