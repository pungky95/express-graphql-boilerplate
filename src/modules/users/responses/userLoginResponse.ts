import { Field, ObjectType } from 'type-graphql';
import { User } from '../../../entity/User';
import { TokenResponse } from '../../authorizations/dto/args/tokenResponse';

@ObjectType()
export class UserLoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => TokenResponse, { nullable: true })
  meta?: TokenResponse;
}
