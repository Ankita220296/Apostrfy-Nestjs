import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interface/user.interface';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await new this.userModel(createUserDto);
    return user.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const user = await this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async getUser(userId: string): Promise<IUser> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const user = await this.userModel.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }
}
