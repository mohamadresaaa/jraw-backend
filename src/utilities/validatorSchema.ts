import joi from "@hapi/joi"

export const accountActivation = joi.object().keys({
  verCode: joi.string().required(),
})

export const forgotPassword = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
})

export const login = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
})

export const register = joi.object().keys({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().min(8).required(),
  username: joi.string().alphanum().required(),
})

export const resetPassword = joi.object().keys({
  password: joi.string().min(8).required(),
  verCode: joi.string().required(),
})
