import { Injectable, Controller, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from '../schemas/todo.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>){}
  async create(createTodoDto: CreateTodoDto): Promise<Todo>  {
    const createdCat = new this.todoModel(createTodoDto);
    return createdCat.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo = await this.todoModel
      .findByIdAndUpdate(id, updateTodoDto, { new: true })
      .exec();
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return updatedTodo;
  }

  async remove(id: string): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return deletedTodo;
  }
}
