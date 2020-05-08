import Joi from '@hapi/joi';

function createErrorSchema(error, errorSchema) {
  const key = error.details[0].path[0];
  const setErrorObject = { ...errorSchema[key], status: 'error' };
  const newErrorSchema = { ...errorSchema, [key]: setErrorObject };

  return { isValid: false, errorStructure: newErrorSchema };
}

// ----------------------------------------------------ContactForm---------------------------------------------
export const formValidSchema = {
  name: {
    status: 'success',
    message: 'Por favor ingresa un nombre válido'
  },
  status: {
    status: 'success',
    message: 'Por favor ingresa un estatus válido'
  },
  species: {
    status: 'success',
    message: 'Por favor ingresa una especie válida'
  },
  gender: {
    status: 'success',
    message: 'Por favor ingresa un género válido'
  },
  image: {
    status: 'success',
    message: 'Por favor ingresa una url válida'
  },
  url: {
    status: 'success',
    message: 'Por favor ingresa una url válida'
  }
};

export function formValidate(form) {
  const schema = Joi.object({
    id: Joi.number().optional(),
    name: Joi.string().required(),
    status: Joi.string().required(),
    type: Joi.optional(),
    gender: Joi.string().required(),
    species: Joi.string().required(),
    image: Joi.string().required(),
    url: Joi.string().required(),
    // Not in use
    origin: Joi.optional(),
    location: Joi.optional(),
    episode: Joi.optional(),
    created: Joi.optional()
  });

  const validate = schema.validate(form);

  if (validate.error) {
    return createErrorSchema(validate.error, formValidSchema);
  }
  return { isValid: true, errorStructure: formValidSchema };
}
