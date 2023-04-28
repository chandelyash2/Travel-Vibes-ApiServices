import users from '@server/database/models/users'
import {
  MutationAuthUserArgs,
  UserPayloadType,
} from '@server/generated/graphql'
import { matchPassword, userNotExist } from '../errors'
import { signToken } from '../authJWT'
export default async (
  _: unknown,
  args: MutationAuthUserArgs,
): Promise<UserPayloadType> => {
  try {
    const input = args.input

    const user = await users.findOne({
      where: { email: input.email },
    })

    const findUser = userNotExist(user)

    if (findUser) {
      return {
        user: null,
        error: findUser,
      }
    }

    const checkPassword = matchPassword(
      user.dataValues.password,
      input.password,
    )

    if (checkPassword) {
      return {
        error: checkPassword,
      }
    }

    const token = signToken(user.dataValues)
    return {
      user: user.dataValues,
      token: token,
      error: null,
    }
  } catch (error) {
    return {
      error: {
        message: 'Something Went Wrong',
        code: 'SERVER_ERROR',
      },
    }
  }
}
