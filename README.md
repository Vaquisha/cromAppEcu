# Cronómetro de series

## Descripción del proyecto

Es un simple cronómetro que te permite guardar una serie y poder utilizar la al momento de realizar tus ejercicios de cualquier índole, ya sea fortalecimiento de músculos, terapia rehabilitadora, etc.
Este proyecto fué realizado con el propósito de brindar una interfaz amigable al usuario, sin tanto ruido visual, sin suscripciones, anuncios, o cualquier interrupción o limitación al momento de realizar todo lo que necesitas para poder tener una correcta trazabilidad de tus ejercicios mediante la app.

La decisión de hacerla de código abierto vino de la poca demanda que hay de estas apps y las que hay, son de paga o repletas de anuncios, por eso brindo este pequeño proyecto a disposición de las personas que deseen contribuir al desarrollo del mismo


## Stack tecnológico

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

```bash
EcuadorFoodApp/
├── app/                 # Pantallas y rutas (Expo Router)
├── assets/              # Imágenes y audios utilizados
├── components/          # Componentes reutilizables y su estilizado
├── data/                # En dónde se almacena el CRUD
├── fonts/               # En dónde se almacenan las fuentes
├── styles/              # La carpeta de estilos
├── app.json             # Configuración general del proyecto
├── package.json         # Dependencias y scripts
├── README.md            # Documentación
```

---

## Instalación y configuración

### Requisitos previos

- Node.js >= 18
- npm o yarn
- Expo CLI

## ¿Qué es Cronómetro de series?

Es una aplicación para realizar una serie y poder guardarla para la ejecución de tus ejercicios, sea en cualquier caso que desees utilizar. Esta app esta pensada para ser multiplataforma. Tiene una interfaz limpia, intuitiva y muy práctica, ya que no posee anuncios, ruido visual, menús complicados ni otro tipo de distracción o molestia al momento de usarla.

---

## Tecnologías que se usaron

- React Native
- Expo (SDK 54)
- Expo Router
- JavaScript / JSX

---

## ¿Qué puedes hacer con la app?

- Guardar ejercicios
- Editar ejercicios
- Revisar tu historial ***(no implementado aún)***
- Reproduce sonidos de inicio y fin
- Tema oscuro y claro ***(no implementado aún)***

---

## ¿Cómo ejecutar el proyecto?

### Requisitos básicos

Antes de empezar, asegúrate de tener instalado:

- Node.js (versión 18 o superior recomendada)
- npm o yarn

### Instala Expo CLI ***(opcional)***:

```bash
npm install -g expo-cli
# También puedes iniciarlo con npm
```

### Instalación/inicialización de dependencias en tu equipo local

```bash
npm install
```

### Servidor de desarrollo

```bash
expo start 
# Para inicializarlo con Expo
```

### .. o en su defecto
```bash
npm start
# Esto inicia el proyecto con npm
```

### Comandos disponibles:

```bash
npm run android   # Ejecutar en Android
npm run ios       # Ejecutar en iOS
npm run web       # Ejecutar en navegador web
```


## Capacidades de la aplicación

- Navegación basada en archivos mediante Expo Router
- Persistencia de estado con AsyncStorage
- Reproducción de audio con Expo AV
- Manejo de archivos y recursos locales
- Interfaz adaptable a múltiples resoluciones


## ¿Para qué se hizo este proyecto?

Cronómetro de series fue desarrollada como parte de un proceso de aprendizaje y formación académica, con el objetivo de reforzar conocimientos en desarrollo de aplicaciones móviles y el uso de herramientas modernas para crear apps multiplataforma.


## 📄 Licencia

Este proyecto se publica bajo la **Licencia Pública General de GNU versión 3 (GPLv3)**.

El código fuente de este software puede ser utilizado con fines educativos, de investigación, para uso personal y todas sus modificaciones deben de ser compartidas con el público a través de este repositorio o cualquier otro método de difusión