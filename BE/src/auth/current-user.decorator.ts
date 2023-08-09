import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../users/schemas/users.schema';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
    if (context.getType() === 'http') {
      return context.switchToHttp().getRequest().user;
    }
    const graphqlContext = GqlExecutionContext.create(context);
    return graphqlContext.getContext().req.user;
  };
  
  export const CurrentUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) =>
      getCurrentUserByContext(context),
  );