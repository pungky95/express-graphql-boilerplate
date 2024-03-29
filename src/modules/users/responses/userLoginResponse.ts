import { Field, ObjectType } from 'type-graphql';
import { User } from '../../../entity/User';
import { TokenResponse } from '../../authorizations/responses/tokenResponse';

@ObjectType()
export class UserLoginResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => TokenResponse, { nullable: true })
  meta?: TokenResponse;
}
