// Importa el tipo Provider de NestJS.
// Un Provider es básicamente una clase u objeto que puede inyectarse en otros lugares de la aplicación.
import { Provider } from '@nestjs/common';

// Importa la librería ioredis, que es el cliente oficial para conectarse a Redis desde Node.js/NestJS.
import Redis from 'ioredis';

// Definimos una constante que servirá como "token" de identificación.
// Con este nombre, NestJS sabrá a qué objeto nos referimos cuando inyectemos el cliente Redis en otros servicios.
export const REDIS_CLIENT = 'REDIS_CLIENT';

// Definimos el Provider que creará y configurará el cliente Redis.
export const RedisProvider: Provider = {
  // El campo "provide" indica el nombre del token que identificará a este Provider.
  provide: REDIS_CLIENT,

  // useFactory es una función que devuelve la instancia que queremos inyectar (en este caso, un cliente Redis).
  useFactory: () => {
    // Creamos una nueva instancia del cliente Redis.
    return new Redis({
      host: process.env.REDIS_HOST || 'localhost', 
      // Dirección del servidor Redis. Si no existe variable de entorno, usa "localhost".

      port: Number(process.env.REDIS_PORT) || 6379,
      // Puerto del servidor Redis. Si no hay variable de entorno, usa el puerto por defecto 6379.
    });
  },
};
