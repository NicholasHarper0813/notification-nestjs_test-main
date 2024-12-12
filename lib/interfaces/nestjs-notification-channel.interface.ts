import { NestJsNotification } from './nestjs-notification.interface';

export interface INestjsNotificationChannel 
{
  send(notification: NestJsNotification): Promise<any>;
}
