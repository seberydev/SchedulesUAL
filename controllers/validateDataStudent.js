const joi = require('joi');

const schema = joi.object({
    name: joi
    .string()
    .trim()
    .min(3)
    .max(200)
    .required(),
    last_name: joi
    .string()
    .trim()
    .min(3)
    .max(200)
    .required(),
    email: joi
    .string()
    .email()
    .required(),
    phone: joi
    .string()
    .trim()
    .min(3)
    .max(200)
    .required(),
    id: joi
    .string()
    .trim()
    .min(3)
    .max(200)
    .required(),
    career: joi
    .string()
    .trim()
    .required(),
    semester: joi
    .string()
    .trim()
    .required()
});

const validateData = (data) => {
    return schema.validate(data);
}

module.exports = validateData;