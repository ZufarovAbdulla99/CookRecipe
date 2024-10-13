import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TelegrafModule } from 'nestjs-telegraf';
// import { BotModule } from '@client';
import { session } from 'telegraf';
import { appConfig, botConfig, dbConfig, jwtConfig } from '@config';
import { CheckAuthGuard, CheckRoleGuard } from '@guards';
import { JwtModule } from '@nestjs/jwt';
import { ExceptionHandlerFilter } from '@filters';
import { SeedsModule } from '@seeds';
import { AuthModule, Category, CategoryModule, Ingredient, IngredientModule, Preparation, PreparationModule, Recipe, RecipeModule, User, UserModule } from '@modules';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 300,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig, botConfig],
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: './uploads',
    }),
    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        try {
          return {
            dialect: 'postgres',
            host: config.get('database.host'),
            port: config.get<number>('database.port'),
            username: config.get('database.user'),
            password: config.get('database.password'),
            database: config.get('database.dbName'),
            models: [User, Category, Preparation, Ingredient, Recipe],
            synchronize: true,
            // sync: {force: true},
            logging: console.log,
            autoLoadModels: true,
          };
        } catch (error) {
          console.log(error);
        }
      },
    }),
    // TelegrafModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     token: config.get<string>("bot.token"),
    //     middlewares: [session()]
    //   })
    // }),
    UserModule,
    CategoryModule,
    SeedsModule,
    PreparationModule,
    IngredientModule,
    RecipeModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandlerFilter,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard
    // },
    // {
    //   useClass: CheckAuthGuard,
    //   provide: APP_GUARD,
    // },
    // {
    //   useClass: CheckRoleGuard,
    //   provide: APP_GUARD,
    // },
  ],
})
export class AppModule {}