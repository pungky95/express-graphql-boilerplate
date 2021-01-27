import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class TokenResponse {
  @Field(() => String, { nullable: true })
  token: string;

  @Field(() => String, { nullable: true })
  issuedTime: string;

  @Field(() => String, { nullable: true })
  expiredTime: string;
}
