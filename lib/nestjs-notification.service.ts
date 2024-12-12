import { INestjsNotificationChannel, NestJsNotification } from './interfaces';
import { Injectable, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class NestjsNotificationService 
{
  private resolveChannel = (channel: Type<INestjsNotificationChannel>) =>
    this.moduleRef.create(channel);

  constructor(private moduleRef: ModuleRef) {}
  public send(notification: NestJsNotification): Promise<any> 
  {
    const channels = notification.sendToChannels();

    return Promise.all(
      channels.map((channel: Type<INestjsNotificationChannel>) =>
        this.sendOnChannel(notification, channel),
      ),
    );
  }

  private async sendOnChannel(
    notification: NestJsNotification,
    clientChannel: Type<INestjsNotificationChannel>,
  ): Promise<any> {
    return (await this.resolveChannel(clientChannel)).send(notification);
  }
}
