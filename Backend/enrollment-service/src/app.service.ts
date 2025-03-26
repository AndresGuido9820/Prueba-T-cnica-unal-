import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Método para un mensaje de bienvenida o información general
  getHello(): string {
    return 'Bienvenido al Course Service!';
  }

  // Método para verificar el estado del servicio (health check)
  getStatus(): { status: string } {
    return { status: 'ok' };
  }

  // Método para obtener información del sistema (opcional)
  getSystemInfo(): { version: string; name: string } {
    return {
      version: '1.0.0',
      name: 'Course Service',
    };
  }
}