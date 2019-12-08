import joi, { ObjectSchema } from "@hapi/joi"

export const accountActivation: ObjectSchema = joi.object().keys({
  verCode: joi.string().required(),
})

export const forgotPassword: ObjectSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
})

export const login: ObjectSchema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
})

export const register: ObjectSchema = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().min(8).required(),
  username: joi.string().alphanum().required(),
})

export const resetPassword: ObjectSchema = joi.object().keys({
  password: joi.string().min(8).required(),
  verCode: joi.string().required(),
})
