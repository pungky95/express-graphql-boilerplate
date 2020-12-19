import {
    Arg,
    Query,
    Mutation,
    Resolver, Field, ObjectType, Ctx,
    UseMiddleware
} from 'type-graphql';
import {ContextType} from "../../types/contextType";
import {User} from '../../entity/user';
import {UserRegisterInput} from '../../schemas/user/userRegisterInput';
import {UserLoginInput} from "../../schemas/user/userLoginInput";
import argon2 from "argon2";
import {ApolloError} from "apollo-server-express";
import {generateToken} from "../../authorization/generateToken";
import {tokenResponse} from "../../schemas/authorization/tokenResponse";
import {isAuthenticated} from "../../middleware/isAuthenticated";

@ObjectType()
class UserLoginResponse {
    @Field(() => User, {nullable: true})
    user?: User;

    @Field(() => tokenResponse, {nullable: true})
    meta?: tokenResponse;
}

@Resolver()
export default class {
    @Query(() => User, {nullable: true})
    @UseMiddleware(isAuthenticated)
    userDetail(
        @Ctx() {user}: ContextType,
    ): Promise<User | undefined> {
        return User.findOne(user.id);
    }

    @Mutation(() => User)
    async userRegister(
        @Arg('input') {firstName, lastName, email, password: plainPassword}: UserRegisterInput
    ): Promise<User> {
        const password = await argon2.hash(plainPassword);
        const user = await User.findOne({where: {email}});
        if (user) {
            throw new ApolloError(
                "Email already taken",
                "EMAIL_NOT_UNIQUE",
            );
        }
        return User.create({
            firstName,
            lastName,
            email,
            password
        }).save();
    }

    @Mutation(() => UserLoginResponse)
    async userLogin(
        @Arg('input') {email, password}: UserLoginInput
    ): Promise<UserLoginResponse | undefined> {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new ApolloError(
                "User not found",
                "USER_NOT_FOUND",
            );
        }
        if (!await argon2.verify(<string>user?.password, password)) {
            throw new ApolloError(
                "Incorrect password",
                "PASSWORD_NOT_MATCH",
            );
        }
        const meta = generateToken(user);
        return {
            user,
            meta
        };
    }
}