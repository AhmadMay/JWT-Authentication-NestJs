import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseModule } from './database.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PostModule,
    ConfigModule.forRoot({
      validationSchema:Joi.object({
        POSTGRES_HOST:Joi.string().required(),
        POSTGRES_PORT:Joi.number().required(),
        POSTGRES_USER:Joi.string().required(),
        POSTGRES_PASSWORD:Joi.string().required(),
        POSTGRES_DB:Joi.string().required(),
        PORT:Joi.number()
      })
    }),
    databaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
