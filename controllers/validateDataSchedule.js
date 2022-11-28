const joi = require('joi');

const schema = joi.object({
    semester: joi
    .string()
    .trim()
    .required(),
    subject: joi
    .string()
    .trim()
    .required(),
    teacher: joi
    .string()
    .trim()
    .required(),
    hour: joi
    .string()
    .trim()
    .required()
});

const validateData = (data) => {
    return schema.validate(data);
}

module.exports = validateData;