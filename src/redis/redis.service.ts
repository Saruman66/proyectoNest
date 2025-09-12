import { Injectable, Logger } from '@nestjs/common';
// Injectable: marca esta clase para que NestJS pueda inyectarla en otros módulos.
// Logger: utilidad de NestJS para imprimir logs en la consola (información, errores, etc.)

import { RedisClientType, createClient } from 'redis';
// RedisClientType: tipo de cliente que representa la conexión a Redis.
// createClient: función que crea un cliente de Redis para conectarse al servidor.

@Injectable()
// Esto le dice a NestJS que esta clase puede ser inyectada como un servicio en otros módulos.
export class RedisService {
  private client: RedisClientType;
  // Aquí guardamos la instancia del cliente Redis para usarlo en todos los métodos.

  private readonly logger = new Logger(RedisService.name);
  // Creamos un logger específico para este servicio, 
  // para que los logs salgan identificados como "RedisService".

  constructor() {
    // 🚀 Crear la conexión con Redis usando host y puerto del .env
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || '127.0.0.1', // Host de Redis
        port: Number(process.env.REDIS_PORT) || 6379, // Puerto de Redis
      },
    });

    // Manejo de errores de conexión
    this.client.on('error', (err) => this.logger.error('Redis Client Error', err));

    // Conectar al arrancar el servicio
    this.client.connect()
      .then(() => this.logger.log('✅ Conectado a Redis'))
      .catch((err) => this.logger.error('❌ Error al conectar Redis', err));
  }

  // -------------------- MÉTODOS PRINCIPALES --------------------
  // Guardar un valor en Redis
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, { EX: ttlSeconds });
    } else {
      await this.client.set(key, value);
    }
  }

  // Obtener un valor de Redis
  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  // Eliminar un valor de Redis
  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  // -------------------- BLOQUE TEMPORAL DE PRUEBA --------------------
  // Este método es solo para probar Redis desde NestJS por consola
  // 🔹 NO dejar en producción; se puede eliminar después de probar
  async testRedis(): Promise<void> {
    this.logger.log('🔹 Iniciando prueba de Redis...');

    // Guardar un valor temporal
    await this.set('test_key', 'hola mundo', 10); 
    this.logger.log('✅ Valor "hola mundo" guardado en Redis con clave "test_key"');

    // Recuperar el valor guardado
    const value = await this.get('test_key');
    this.logger.log('🔹 Valor recuperado de Redis:', value || 'No se encontró el valor');

    // Eliminar la clave
    await this.del('test_key');
    this.logger.log('✅ Clave "test_key" eliminada de Redis');
  }
}

// -------------------- EXPLICACIÓN ADICIONAL --------------------
// 1. Cada método usa "await" porque las operaciones Redis son asíncronas.
// 2. RedisClientType es solo un tipo de TypeScript para mayor seguridad.
// 3. Logger permite rastrear errores o confirmar que la conexión se hizo correctamente.
// 4. La clase es inyectable con @Injectable, por eso cualquier módulo que importe
//    RedisModule puede usar RedisService directamente sin crear otra instancia.
// 5. La prueba temporal `testRedis()` guarda, lee y elimina un valor para verificar
//    la conexión con Redis desde la consola.
// 6. Esto es útil para Docker Redis; no necesitas instalar Redis localmente.
// 7. Para que no aparezca el error "Cannot find module 'redis'", necesitas instalar el paquete npm:
//    `npm install redis @types/redis --save`
