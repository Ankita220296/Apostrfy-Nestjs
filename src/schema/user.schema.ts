import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  address: string;

  @Prop()
  phone: number;
}
export const UserSchema = SchemaFactory.createForClass(User);
