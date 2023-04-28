import users from '@server/database/models/users'
import { ResolverCtx } from '@server/gateway/types'

export default async (_: unknown, args: null, ctx: ResolverCtx) => {
  try {
    const user = ctx.user
    if (!user) return null
    const findUser = (await users.findOne({ where: { email: user.email } }))
      .dataValues
    return findUser
  } catch (error) {
    return {
      error,
    }
  }
}
