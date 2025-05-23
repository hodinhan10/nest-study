import { Module } from '@nestjs/common';
import { CatsService } from './service/cats.service';
import { CatsController } from './controller/cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './schemas/cat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
