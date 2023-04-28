/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { User } from '@server/generated/graphql'

export type ResolverCtx = {
  req: Request
  res: Response
  user: Partial<User>
}
