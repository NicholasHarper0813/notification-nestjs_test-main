import { INestjsNotificationChannel } from './nestjs-notification-channel.interface';
import { Type } from '@nestjs/common';

export interface NestJsNotification {
  sendToChannels(): Type<INestjsNotificationChannel>[];
  toPayload?(): Record<string, any>;
}
