import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CatsModule } from './cats/cats.module';
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_CONNECTION_STRING ??
        (() => {
          throw new Error('MONGO_CONNECTION_STRING is not defined');
        })(),
    ),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CatsModule,
    AuthModule,
    UsersModule,
    TodoModule,
  ],
})
export class AppModule {}
