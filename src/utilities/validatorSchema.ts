import joi from "@hapi/joi"

export const checkCode = joi.object().keys({
  code: joi.string().required(),
})

export const checkUsername = joi.object().keys({
  username: joi.string().required(),
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
  code: joi.string().required(),
  password: joi.string().min(8).required(),
  passwordConfirmation: joi.string().valid(joi.ref("password")).messages({"any.only": "passwordConfirmation must match password"}),
})

export const changePassword = joi.object().keys({
  newPassword: joi.string().min(8).required(),
  oldPassword: joi.string().required(),
  passwordConfirmation: joi.string().valid(joi.ref("newPassword")).messages({"any.only": "passwordConfirmation must match new password"}),
})
