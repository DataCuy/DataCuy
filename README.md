# 🐹 DataCuy
> **"Por una vida digna y saludable para cada cobaya en el mundo."**

## 🌟 La Visión
DataCuy nació de la necesidad de centralizar y democratizar la información sobre la salud de las cobayas. Inspirado en la filosofía de Nikola Tesla sobre la energía libre, buscamos democratizar el acceso al conocimiento preventivo, reduciendo la brecha de desinformación y conectando de forma efectiva a los dueños con los médicos especialistas. 

Este proyecto está dedicado a **Némesis** y **Génesis**, las cobayas que inspiraron la arquitectura de este sistema.

---

## 👥 El Equipo
Este es un esfuerzo interdisciplinario que une la ingeniería de software con la medicina veterinaria de exóticos:

* **Francisco Xavier Nieto Orozco (@DevXavierNieto)** - *Lead Architect & Founder*.
* **Lol Angelica Estrada Puch (@Angi12344)** - *Back-end Developer*.
* 
---

## 🛠️ Estructura del Proyecto
Para mantener el orden y la escalabilidad, el repositorio se organiza de la siguiente manera:

* `/assets/imgs`: Repositorio de imágenes optimizadas.
* `/pages`: Módulos de información (Alimentación, Enciclopedia, Veterinarios).
* `/css`: Estilos globales y guías de diseño.
* `/netlify/functions`: Lógica de servidor y conexión con bases de datos.

---

## 🎨 Arquitectura de Estilos (CSS Modular)
Para evitar conflictos en Git y mantener un código limpio, utilizamos una estructura dividida en 4 archivos maestros importados desde `styles.css`. **Por favor, edita solo el archivo que corresponda a tu tarea:**

* **`base.css`**: Variables (`:root`), fuentes y estilos globales. No modificar sin aprobación del Arquitecto.
* **`layout.css`**: Estructura del sitio (Header, Nav, Footer) y diseño responsivo del menú.
* **`components.css`**: Elementos reutilizables (Botones, Tarjetas, Modales, Estilos de Formulario).
* **`pages.css`**: Estilos exclusivos de cada sección (Grid de alimentos, Enciclopedia, Directorio).

---

## 🚀 Protocolo de Colaboración
Para mantener un historial limpio y cuidar los recursos de hosting:

1. **Ramas Personales:** Cada integrante trabajará en su propia rama (ej. `nombre/nueva-funcionalidad`). 
2. **Pull Requests:** Una vez terminado el trabajo, se solicitará un *Pull Request* hacia la rama principal para revisión.
3. **Despliegue:** Las actualizaciones a producción se realizarán de forma **mensual** por el Arquitecto del proyecto para optimizar créditos de hosting.
4. **Validación Médica:** Ninguna información de salud puede publicarse sin el visto bueno de la PMVZ.

---

## 💻 Configuración Técnica (Entorno de Desarrollo)
Para que el sistema funcione en tu computadora local, sigue estos pasos:

### 1. Requisitos Previos
* **Node.js**: Versión **24.13.0** o superior.
* **Netlify CLI**: Instalar de forma global con el comando:
  ```bash
  npm install netlify-cli -g

### 2. Instalación    
Clona el repositorio y en la carpeta raíz ejecuta:
  npm install

### 3. Variables de Entorno (.env)
Este proyecto utiliza variables secretas para conectar con el Backend. 
* Copia el archivo `.env.example` y renómbralo a `.env`.
* Sigue las instrucciones detalladas dentro del archivo para configurar tu propio Google Apps Script y Google Sheets de prueba. 
* IMPORTANTE: Nunca subas el archivo `.env` al repositorio; este debe permanecer solo en tu equipo local por seguridad.

### 4. Ejecución Local
Para iniciar el servidor de desarrollo con soporte para funciones de servidor (Netlify Functions):
  netlify dev
