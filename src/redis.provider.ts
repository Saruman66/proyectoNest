// Importa el tipo Provider de NestJS (sirve para definir servicios que se pueden inyectar en otros lados)
import { Provider } from '@nestjs/common';

// Importa Redis como default desde ioredis para poder crear instancias
import Redis from 'ioredis';

// Constante que usamos como "token" para identificar al cliente Redis en las inyecciones
export const REDIS_CLIENT = 'REDIS_CLIENT';

// Definimos un proveedor que crea y devuelve un cliente de Redis
export const RedisProvider: Provider = {
  provide: REDIS_CLIENT, // Le decimos a NestJS que este provider estará disponible bajo el nombre "REDIS_CLIENT"
  useFactory: () => {    // useFactory → función que crea la instancia del cliente Redis
    return new Redis({   // Aquí creamos el cliente Redis
      host: process.env.REDIS_HOST || 'localhost', // Dirección de Redis (si no hay variable de entorno, usa localhost)
      port: Number(process.env.REDIS_PORT) || 6379, // Puerto de Redis (si no hay variable, usa 6379)
    });
  },
};
