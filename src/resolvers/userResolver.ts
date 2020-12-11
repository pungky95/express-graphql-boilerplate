import {
    Arg,
    Query,
    Mutation,
    Resolver,
} from 'type-graphql';
import {User} from '../schemas/User';
import { UserInput } from './userInput';
@Resolver()
export default class {
    @Query(() => User, { nullable: true })
    userDetail(@Arg('id') id: number) {
        return {
            id,
            name:'Pungky Kurniawan Kristianto',
            email:'pungkykurniawankr@gmail.com'
        }
    }

    @Mutation(() => User)
    userCreate(
        @Arg('input') { name, email }: UserInput
    ) {
        return{
            id:1,
            name,
            email
        }
    }
}