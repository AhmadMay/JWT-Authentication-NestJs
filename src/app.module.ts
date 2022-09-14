import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AtuhenticationModule } from './authentication/auth.module';
import { databaseModule } from './database.module';
import { PostModule } from './post/post.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    UserModule,
    AtuhenticationModule,
    PostModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema:Joi.object({
        POSTGRES_HOST:Joi.string().required(),
        POSTGRES_PORT:Joi.number().required(),
        POSTGRES_USER:Joi.string().required(),
        POSTGRES_PASSWORD:Joi.string().required(),
        POSTGRES_DB:Joi.string().required(),
        PORT:Joi.number(),

        //JWT

        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    databaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
