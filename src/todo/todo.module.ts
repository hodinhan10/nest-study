import { Module } from '@nestjs/common';
import { TodoService } from './service/todo.service';
import { TodoController } from './controller/todo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
