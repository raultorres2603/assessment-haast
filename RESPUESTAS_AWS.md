## Arquitectura en AWS:
> Describe cómo diseñarías una arquitectura básica en AWS para una aplicación
web que incluya un front-end en React, un back-end en Node.js, y una base de
datos. ¿Qué servicios de AWS utilizarías y por qué?

Por lo que respecta a donde alojar el Front, lo alojaría en un bucket de Amazon S3, donde serviría la aplicación en archivos estaticos, que se encontrarían en la carpeta `dist/` y, para alojar el Back, utilizaría Amazon Elastic Beanstalk
que te permite desplegar aplicaciones Node sin tener que modificar ni administrar nada, es decir, la subes y se balancea sola.

## Escalabilidad y Alta Disponibilidad:

> Imagina que tu aplicación necesita escalar debido a un aumento repentino en el
tráfico. ¿Qué herramientas y servicios de AWS usarías para asegurar que tu
aplicación siga siendo accesible y responda rápidamente?

Podríamos usar el servicio Amazon EC2 Auto Scaling, que de forma automática mide el uso de red, cpu y memoria del servidor y tu, como administrador, eliminarás o agregarás instancias y, utilizando también Elastic Load Balancer distribuirás el balance
de carga.

## Gestión de Seguridad:
> Explica cómo manejarías la seguridad en una aplicación desplegada en AWS.
¿Cómo protegerías datos sensibles y qué medidas tomarías para asegurar las
comunicaciones entre servicios?

El propio Amazon S3 tiene un sistema de almacenamiento cifrado (si se activa) y, junto con AWS Key Management Service (KMS), puedes administrar las claves de cifrado de cliente asimetricas. Obviamente, cabe decir que se ha de activar una
comunicación TLS-SSL para garantizar un cifrado idóneo en la comunicación cliente-servidor

## DevOps y CI/CD en AWS:
> ¿Qué servicios de AWS recomendarías para implementar una pipeline de CI/CD
(Integración Continua / Despliegue Continuo) y cómo los integrarías con Git?

Tendriamos que instalar todos estos servicios: AWS CodeCommit (para subir a git), AWS CodeBuild (para compilación y test), AWS CodePipeline (registro de las acciones), AWS CodeDeploy (como en el caso de muchos como Render, autodeploy de la app) o, si 
no queremos ninguno de estos, podemos usar directamente BitBucket (de pago), GitHub o GitLab.

## Cost Management:
> ¿Cómo optimizarías los costos de una aplicación que está desplegada en AWS?
Menciona algunas estrategias o servicios que te ayudarían a reducir el costo sin
comprometer el rendimiento.

Se ha de controlar muy bien la cantidad de servicios contratados, por lo que habría que mirar bien el uso de instancias, el almacenamiento y el uso del serverless, que se ejecute más en entorno cliente y sea Amazon quien maneje el transito
y los datos que son mandados.
