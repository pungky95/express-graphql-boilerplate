import {
  Arg,
  Query,
  Mutation,
  Resolver,
  Ctx,
  UseMiddleware
} from 'type-graphql';

import { ContextType } from '../../types/contextType';
import { User } from '../../entity/User';
import { UserRegisterInput } from '../../schemas/user/userRegisterInput';
import { UserLoginInput } from '../../schemas/user/userLoginInput';
import argon2 from 'argon2';
import { ApolloError } from 'apollo-server-express';
import { generateToken } from '../../authorization/generateToken';
import { isAuthenticated } from '../../middleware/isAuthenticated';
import { UserLoginResponse } from '../../schemas/user/userLoginResponse';

@Resolver()
export default class {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuthenticated)
  userDetail(@Ctx() { user }: ContextType): Promise<User | undefined> {
    return User.findOne(user.id);
  }

  @Mutation(() => User)
  async userRegister(
    @Arg('input')
    { firstName, lastName, email, password: plainPassword }: UserRegisterInput
  ): Promise<User> {
    const password = await argon2.hash(plainPassword);
    const user = await User.findOne({ where: { email } });
    if (user) {
      throw new ApolloError('Email already taken', 'EMAIL_NOT_UNIQUE');
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
    @Arg('input') { email, password }: UserLoginInput
  ): Promise<UserLoginResponse | undefined> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new ApolloError('User not found', 'USER_NOT_FOUND');
    }
    if (!(await argon2.verify(user?.password as string, password))) {
      throw new ApolloError('Incorrect password', 'PASSWORD_NOT_MATCH');
    }
    const meta = generateToken(user);
    return {
      user,
      meta
    };
  }

  @Mutation(() => User)
  async userDelete(
    @Ctx() { user: { id }, connection }: ContextType
  ): Promise<User | undefined> {
    const user = await User.findOne(id);
    const userRepository = connection.getRepository(User);
    await userRepository.softDelete(id);
    return user;
  }
}
