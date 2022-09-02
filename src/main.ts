import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  let port =process.env.PORT || 3000

  await app.listen(port,()=>{
    console.log(`App is running on the port ${port}`)
  });
}
bootstrap();