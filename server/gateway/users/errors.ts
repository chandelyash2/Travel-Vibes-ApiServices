import { ErrorType } from '@server/generated/graphql'
import { User } from '@server/generated/graphql'
import bcrypt from 'bcrypt'
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}
const validatepassword = (password: string) => {
  return String(password).match(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  )
}

export const isValidEmail = (email: string): ErrorType | undefined => {
  const checkEmail = validateEmail(email)
  if (!checkEmail) {
    return {
      message: 'Invalid Email Address‼️',
      code: 'INVALID_EMAIL',
    }
  }
}
export const isUserExist = (User: User): ErrorType | undefined => {
  if (User) {
    return {
      message: 'Email already exist‼️',
      code: 'EMAIL_ALREADY_EXIST',
    }
  }
}
export const userNotExist = (user): ErrorType | undefined => {
  if (!user) {
    return {
      message: 'User account not exist',
      code: 'USER_NOT_EXIST',
    }
  }
}
export const isValidPassword = (password: string) => {
  const checkPassword = validatepassword(password)

  if (!checkPassword) {
    return {
      message:
        'Password should be of 8 chars minimum and  contain at least one lower case (a-z), one upper case (A-Z) and number (0-9)',
      code: 'INVALID_PASSWORD',
    }
  }
}
export const matchPassword = (password: string, newPasword: string) => {
  const valid = bcrypt.compareSync(newPasword, password)
  if (!valid) {
    return {
      message: 'Invalid Login Credentials‼️',
      code: 'INVALID_CREDS',
    }
  }
}
