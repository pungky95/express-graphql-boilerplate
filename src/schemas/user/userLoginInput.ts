import { Field, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UserLoginInput {
    @Field(() => String)
    @IsEmail()
    email: string;

    @Field(() => String)
    password: string;
}