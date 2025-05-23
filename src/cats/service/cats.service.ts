import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Cat, CatDocument } from '../schemas/cat.schema';
import { UpdateCatDto } from '../dto/update-cat.dto';
import { CreateCatDto } from '../dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    if (!isValidObjectId(id)) {
     throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    const cat = await this.catModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel
      .findByIdAndUpdate(id, updateCatDto, { new: true })
      .exec();
    if (!updatedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return updatedCat;
  }

  async remove(id: string): Promise<Cat> {
    const deletedCat = await this.catModel.findByIdAndDelete(id).exec();
    if (!deletedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return deletedCat;
  }
}
