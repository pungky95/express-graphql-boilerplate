
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
    @Field(() => ID)
    id: number;

    @Field()
    name: String;

    @Field()
    email: String;
}