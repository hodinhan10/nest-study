import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema}])],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
