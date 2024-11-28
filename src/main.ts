/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as net from 'net';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const DEFAULT_PORT = 3000;
  let port = DEFAULT_PORT;

  const findAvailablePort = async (startPort: number): Promise<number> => {
    const testPort = (portToTest: number) =>
      new Promise((resolve, reject) => {
        const server = net
          .createServer()
          .once('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
              resolve(false);
            } else {
              reject(err);
            }
          })
          .once('listening', () => {
            server.close();
            resolve(true);
          })
          .listen(portToTest);
      });

    while (!(await testPort(startPort))) {
      startPort += 1;
    }
    return startPort;
  };

  port = await findAvailablePort(port);
  await app.listen(port);
  console.log(`🚀 La aplicación está corriendo en: http://localhost:${port}`);
}

bootstrap();
