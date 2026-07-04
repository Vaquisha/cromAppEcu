# Guía para contribuidores

### Gracias por tu tiempo para contribuir en este proyecto!!!

Sigue estos pasos para poder aportar con tu granito de arena a esta app:

### 1. Clona este repo:

``` bash
git clone https://github.com/Vaquisha/cromAppEcu.git
```

### 2. Cambias al directorio brindado:
``` bash
cd CromAppEcu
```

### 3. Instala las dependencias:
``` bash
npm install
```

### 4. Inicia el servidor local:
```bash
npm start            # Para iniciar con npm
expo start           # Para iniciar con Expo CLI
```
### 5. Abre tu emulador con "a" (Android Emulator) o "i" (iOS Simulator) según el sistema en dónde vayas a trabajar

Esto sería todo para tener tu propia copia del código fuente y poder modificarlo y compilarlo a tu gusto.

---

# Flujo de trabajo

### Para poder realizar un pull request al repositorio principal debes saber cómo están constituidas las ramas de este repo:

|Rama  | Descripción |
| ----------- | ----------- |
| `master/`    | Para cambios ya estables y correctamente implementados
| `main/`      | Para cambios aún en revisión
| `test/`      | Para código que esté roto y/o en pruebas

_Ahora que ya sabes, podemos pasar al flujo de trabajo para la contribución._

### 1. Crea una rama desde `test` con un nombre corto, claro y descriptivo.

``` bash
git checkout -b [nombre-de-tu-rama]/nombre-descriptivo
# Ejemplo
git checkout -b fix/night-bar-mode
```

### 2. Realiza el commit con tus cambios, sigue las covenciones para con los commits

``` bash
git add .
git commit -m "Descripción breve del cambio"
```

### 3. Envía tu pull request para una revisón
```bash
git push origin feature/nombre-descriptivo
```
## Esto es todo. Gracias por tu contribución al proyecto.