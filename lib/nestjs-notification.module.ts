import { DynamicModule, Module, Provider, ValueProvider } from '@nestjs/common';
import { NestjsNotificationService } from './nestjs-notification.service';
import {
  NestjsNotificationModuleAsyncOptions,
  NestjsNotificationModuleOptions,
  NestjsNotificationModuleOptionsFactory,
} from './interfaces';
import { NESTJS_NOTIFICATION_OPTIONS } from './constants';

@Module({})
export class NestjsNotificationModule {
  static register(options: NestjsNotificationModuleOptions): DynamicModule 
  {
    const notifyProvider: ValueProvider = {
      provide: NESTJS_NOTIFICATION_OPTIONS,
      useValue: options,
    };

    return 
    {
      module: NestjsNotificationModule,
      providers: [NestjsNotificationService, notifyProvider],
      exports: [NestjsNotificationService, notifyProvider],
    };
  }

  static registerAsync(options: NestjsNotificationModuleAsyncOptions): DynamicModule
  {
    const notifyProvider: ValueProvider = 
    {
      provide: NESTJS_NOTIFICATION_OPTIONS,
      useValue: options,
    };

    return 
    {
      module: NestjsNotificationModule,
      imports: options.imports || [],
      providers: [NestjsNotificationService, notifyProvider, ...this.createAsyncProviders(options)],
      exports: [NestjsNotificationService, notifyProvider],
    };
  }

  private static createAsyncProviders(options: NestjsNotificationModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) 
    {
      return [this.createAsyncConfigProvider(options)];
    } 
    else if (!options.useClass) 
    {
      return [
        {
          provide: NESTJS_NOTIFICATION_OPTIONS,
          useValue: {},
          inject: options.inject || [],
        },
      ];
    }

    return [
      this.createAsyncConfigProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncConfigProvider(
    options: NestjsNotificationModuleAsyncOptions,
  ): Provider<any> {
    if (options.useFactory) 
    {
      return 
      {
        provide: NESTJS_NOTIFICATION_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = options.useClass || options.useExisting;

    if (!inject) 
    {
      throw new Error('Invalid configuration.');
    }

    return 
    {
      provide: NESTJS_NOTIFICATION_OPTIONS,
      async useFactory(
        optionsFactory: NestjsNotificationModuleOptionsFactory,
      ): Promise<NestjsNotificationModuleOptions> {
        return optionsFactory.createNestjsNotificationOptions();
      },
      inject: [inject],
    };
  }
}
