import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export interface NestjsNotificationModuleOptionsFactory 
{
  createNestjsNotificationOptions():
    | Promise<NestjsNotificationModuleOptions>
    | NestjsNotificationModuleOptions;
}

export interface NestjsNotificationModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> 
{
  useExisting?: Type<NestjsNotificationModuleOptionsFactory>;
  useClass?: Type<NestjsNotificationModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<NestjsNotificationModuleOptions> | NestjsNotificationModuleOptions;
  inject?: any[];
  extraProviders?: Provider[];
}

export type NestjsNotificationModuleOptions = null;
