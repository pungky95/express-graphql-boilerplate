import { Field, InputType } from 'type-graphql';
import { IsEmail, Length } from 'class-validator';

@InputType()
export class UserRegisterInput {
    @Field(() => String)
    @Length(1, 50)
    firstName: string;

    @Field(() => String,{nullable:true})
    @Length(1, 50)
    lastName: string;

    @Field(() => String)
    @IsEmail()
    @Length(1, 150)
    email: string;

    @Field(() => String)
    @Length(6,30)
    password: string;
}