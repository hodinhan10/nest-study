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
      'mongodb+srv://hodinhan2k:YWj9t8g0eGixlcco@cluster0.axrlicb.mongodb.net/catsdb?retryWrites=true&w=majority',
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
