import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './schema/user.schema';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Ankita220296:Ankita704696@cluster0.d9vvv.mongodb.net',
      {
        dbName: 'apostrfy',
      },
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PassportModule,
    AuthModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
