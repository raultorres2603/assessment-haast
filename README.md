# Prueba técnica para Full-Stack Dev
## Descripción del proyecto
El proyecto está creado de forma responsive entre dispositivos móviles y PC, cambiando su disposición dependiendo del dispositivo en el que se visualiza.
## Explicaciones técnicas importantes
Se ha usado ContextApi para manejar los estados globales, no se ha usado Redux por falta de experiencia con la libreria y tiempo de entrega (al estar de vacaciones solo he podido usar el viernes para hacer dicha prueba). Para la actualización de datos se ha usado asincronia y, al ser fructuosa la llamada
con fetch, actualizar en cliente.
## Creación del .env (NECESARIO)
Para poder utilizar la parte del back, **se necesita un archivo .env**, el cual **se adjuntará por correo al evaluador** y que tendrá que incluir en la raíz del back, es decir, **dentro de la carpeta back**
## Utilización del Back-End

Para poder ejecutar la aplicación en formato desarrollo, **abriremos una terminal o CMD (Windows) y haremos los siguientes comandos dentro del repositorio, en la raíz:**

`cd back/`

`npm i`

`npm run start`

*En el caso que estés en Linux o MacOS, a lo mejor el `npm i` tiene que ser ejecutado con sudo, quedando así la sucesión de comandos:*

`cd back/`

`sudo npm i`

`npm run start`

## Utilización del Front-End
> La build está dentro de `front/dist`

Para poder ejecutar la aplicación en formato desarrollo, **abriremos una terminal o CMD (Windows) y haremos los siguientes comandos dentro del repositorio, en la raíz:**

`cd front/`

`npm i`

`npm run dev`

*En el caso que estés en Linux o MacOS, a lo mejor el `npm i` tiene que ser ejecutado con sudo, quedando así la sucesión de comandos:*

`cd front/`

`sudo npm i`

`npm run dev`

Una vez ejecutados los comandos, iremos a la dirección URL: http://localhost:5173 o dando click [aqui](http://localhost:5173)

A partir de aquí, podremos utilizar la aplicación sin problemas
