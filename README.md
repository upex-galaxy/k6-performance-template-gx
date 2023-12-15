<div align="center">

[![Test in QA🧪](https://github.com/upex-galaxy/k6-performance-ts/actions/workflows/test.yml/badge.svg)](https://github.com/upex-galaxy/k6-performance-ts/actions/workflows/test.yml)

# Plantilla para usar TypeScript con k6
</div>

Este repositorio proporciona un proyecto base para comenzar a usar TypeScript en tus scripts de k6.

## Prerrequisitos

- [k6](https://k6.io/docs/getting-started/installation)
- [NodeJS](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Instalación

**Creando un proyecto desde la plantilla `k6-performance-ts`**

Para generar un proyecto TypeScript que incluya las dependencias y la configuración inicial, navega a la página [template-typescript](https://github.com/k6io/template-typescript) y haz clic en **Use this template**.

**Instalar dependencias**

Clona el repositorio generado en tu máquina local, muévete a la carpeta raíz del proyecto e instala las dependencias definidas en [`package.json`](./package.json)

```bash
git clone <project-url>
```
```bash
cd k6-performance-ts
```
```bash
yarn
```

## Asegúrate de estar usando Node v16
Para asegurarte de que estés usando la versión de Node que necesita el repo, ejecuta simplemente:
```bash
nvm use
```
*(si no tienes instalado nvm, Qué esperas!? instalado y vuelve a intentar, si no tienes la versión de Node del repo debes instalarlo con nvm install)*


## Ejecutando la prueba

Para ejecutar una prueba escrita en TypeScript, primero tenemos que transpilar el código TypeScript a JavaScript y empaquetar el proyecto

```bash
yarn build
```

Este comando crea los archivos finales de prueba en la carpeta `./webpack`.

Una vez hecho esto, podemos ejecutar nuestro script de la misma manera que usualmente lo hacemos, por ejemplo:

```bash
k6 run webpack/check.test.ts
```

> [!NOTE]
> ten en cuenta que el archivo `performance.test.ts` es un archivo de prueba real usando credenciales de una proyecto serio, por lo que no podrás ejecutarlo sin las variables declaradas. Este archivo es solo para demostración REAL de un archivo usando las variables de entorno de k6.

## Reporte de Pruebas con Grafana
Se puede ejecutar las pruebas apuntando a tu cuenta Grafana!
- Sigue las instrucciones paso a paso de la Documentación ofical:
    - [Grafana Cloud k6 - Getting Started](https://grafana.com/docs/grafana-cloud/k6/get-started/run-cloud-tests-from-the-cli/#run-locally-and-stream-to-the-cloud)
- Hay unos scripts configurados de yarn que tenemos en este repo para iniciar sesión localmente y correr una prueba y reportarla a tu usuario de Grafana:
    - `yarn k6:login`
    - `yarn test:check`
    - Recuerda primero establecer tu variable de entorno con el Token de tu cuenta Grafana! usando `export K6_CLOUD_TOKEN=ESCRIBE_AQUI_TU_TOKEN`

## Ejecución en CI con Grafana
Para que funcione tu Pipeline de CI de GitHub Actions con Grafana debes usar este action:
- [GitHub Action k6-load-test](https://github.com/marketplace/actions/k6-load-test)

## Escribiendo tus propias pruebas

Reglas para escribir pruebas:
- El código de prueba se encuentra en la carpeta `tests`
- Los puntos de entrada para las pruebas deben tener el sufijo "_test.ts_" en el nombre de archivo, para distinguirlos de los archivos auxiliares. Puedes cambiar la entrada en el archivo `webpack.config.js`. 
- Si se requieren archivos estáticos, agrégalos a la carpeta `./assets`. Su contenido se copia a la carpeta de destino (`webpack`) junto con los scripts compilados.

### Transpilación y Empaquetamiento

Por defecto, k6 solo puede ejecutar código JavaScript ES5.1. Para usar TypeScript, tenemos que configurar un empaquetador que convierta el código TypeScript a código JavaScript.

Este proyecto utiliza `Babel` y `Webpack` para empaquetar los diferentes archivos, utilizando la configuración del archivo [`webpack.config.js`](./webpack.config.js).

Si quieres aprender más, consulta [Bundling node modules in k6](https://k6.io/docs/using-k6/modules#bundling-node-modules).
