import jwt from 'jsonwebtoken'
import { User } from '@server/generated/graphql'

export const signToken = (user: User) => {
  const token = jwt.sign(
    {
      user: {
        id: user._id,
        email: user.email,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY },
  )
  return token
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export const parseJwt = (req: any) => {
  const authorizationHeader = req.headers.authorization
  // const token = authorizationHeader.replace('Bearer ', '')
  try {
    const jwtData: any = verifyToken(authorizationHeader)
    if (jwtData) {
      req.user = jwtData.user
    }
  } catch (error) {
    console.log(error, 'jwtError')
  }
}
