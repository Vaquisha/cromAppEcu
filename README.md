# Cronómetro de series

## Descripción del proyecto

**Cronómetro de series** es una aplicación móvil multiplataforma desarrollada con **React Native** dentro del ecosistema **Expo**. El proyecto utiliza **Expo Router** para la navegación basada en archivos e integra diversas APIs de Expo para acceder a funcionalidades nativas manteniendo un único código base.

La aplicación sigue una arquitectura modular y escalable, adecuada para evaluación académica, prototipado y como base para aplicaciones móviles de nivel productivo.

---

## 🛠️ Stack tecnológico

- **React Native** – Framework de interfaz de usuario
- **Expo SDK 54** – Entorno de ejecución y herramientas
- **Expo Router** – Sistema de enrutamiento basado en archivos
- **JavaScript (ES6+) / JSX**
- **AsyncStorage** – Persistencia de datos local
- **Expo AV** – Manejo y reproducción de audio
- **Expo File System** – Gestión de archivos locales
- **Expo Font** – Carga de fuentes personalizadas

---

## 📂 Estructura del proyecto

```
EcuadorFoodApp/
├── app/                 # Pantallas y rutas (Expo Router)
├── assets/              # Imágenes, audios y fuentes
├── components/          # Componentes reutilizables
├── constants/           # Constantes y configuración global
├── hooks/               # Hooks personalizados
├── app.json             # Configuración de Expo
├── package.json         # Dependencias y scripts
├── README.md            # Documentación
```

---

## ⚙️ Instalación y configuración

### Requisitos previos

- Node.js >= 18
- npm o yarn
- Expo CLI

```bash
npm install -g expo-cli
```

### Instalación de dependencias

```bash
npm install
```

### Servidor de desarrollo

```bash
expo start
```

Comandos disponibles:

```bash
npm run android   # Ejecutar en Android
npm run ios       # Ejecutar en iOS
npm run web       # Ejecutar en navegador web
```

---

## 🧩 Capacidades de la aplicación

- Navegación basada en archivos mediante Expo Router
- Persistencia de estado con AsyncStorage
- Reproducción de audio con Expo AV
- Manejo de archivos y recursos locales
- Interfaz adaptable a múltiples resoluciones

---

## ⚠️ Notas de desarrollo

- El proyecto utiliza **Expo Dev Client** para flujos de desarrollo avanzados.
- Es importante verificar las rutas de los assets (especialmente audios) para evitar errores del Metro Bundler.
- Compatible con entornos de desarrollo **Windows, Linux y macOS**.

---

## 👨‍💻 Autor

**Carlos Vaca**  
Tecnólogo en Software | Estudiante de Ingeniería en Sistemas

---

## 📄 Licencia

Este proyecto se publica bajo la **Licencia Pública General de GNU (GPL)**.

Esto significa que el software puede ser usado, estudiado, modificado y redistribuido libremente, siempre que cualquier trabajo derivado mantenga la misma licencia GPL y se distribuya con su código fuente correspondiente.

