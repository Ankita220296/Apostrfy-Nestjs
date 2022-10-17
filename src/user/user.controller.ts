import {
  Body,
  Controller,
  UseGuards,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        user,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.updateUser(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const user = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        user,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
