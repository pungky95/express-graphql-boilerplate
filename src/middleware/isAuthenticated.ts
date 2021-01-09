import { MiddlewareFn } from 'type-graphql';
import { ContextType } from '../types/contextType';
import { AuthenticationError } from 'apollo-server-express';

export const isAuthenticated: MiddlewareFn<ContextType> = (
  { context },
  next
) => {
  if (!context.user) {
    throw new AuthenticationError('Unauthorized');
  }

  return next();
};
