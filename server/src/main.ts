import { NestFactory } from '@nestjs/core'
import { AppModule } from './infra/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  })

  await app.listen(3333)
}
bootstrap()
