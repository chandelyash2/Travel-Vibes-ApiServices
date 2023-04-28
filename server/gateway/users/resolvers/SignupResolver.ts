import { isValidPassword } from './../errors'
import users from '@server/database/models/users'
import { MutationSignupArgs, UserPayloadType } from '@server/generated/graphql'
import { isUserExist, isValidEmail } from '../errors'
import bcrypt from 'bcrypt'
import { signToken } from '../authJWT'
export default async (
  _: unknown,
  args: MutationSignupArgs,
): Promise<UserPayloadType> => {
  try {
    const input = args.input
    const validEmail = isValidEmail(input.email)
    if (validEmail) {
      return {
        user: null,
        error: validEmail,
      }
    }
    const findUser = await users.findOne({
      where: { email: input.email },
    })

    const userExist = findUser && isUserExist(findUser.dataValues)
    if (userExist) {
      return {
        user: null,
        error: userExist,
      }
    }

    const validPassword = isValidPassword(input.password)

    if (validPassword) {
      return {
        user: null,
        error: validPassword,
      }
    }
    const hashedPassword = await bcrypt.hash(input.password, 12)
    const user = await users
      .create({
        ...input,
        password: hashedPassword,
      })
      .then((res) => {
        return res
      })

    const token = signToken(user.dataValues)

    return {
      user: user.dataValues,
      token: token,
      error: null,
    }
  } catch (error) {
    console.log(error)
    return {
      user: null,
      error: {
        message: error[0].message,
        code: 'SOMETHING_WENT_WRONG',
      },
    }
  }
}
