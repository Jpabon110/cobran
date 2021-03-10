/* eslint-disable no-useless-escape */
/* eslint-disable quote-props */
/* eslint-disable import/prefer-default-export */
export const loginSchema = {
  type: 'object',
  required: ['email', 'password'],
  allOf: [{
    properties: {
      email: {
        type: 'string',
        maxLength: 50,
        minLength: 5,
        format: 'email',
        lowercase: true,
        trim: true,
      },
      password: {
        type: 'string',
        minLength: 8,
        lowercase: true,
        trim: true,
      },
    },
    additionalProperties: false,
  }],
  errorMessage: {
    type: 'data should be an object',
    properties: {
      email: 'Verifique que el email se encuentre en formato correcto',
      password: 'el password debe tener al menos 8 caracteres',
    },
    required: {
      email: 'El campo email no puede ser nulo',
      password: 'El campo password no puede ser nulo',
    },
  },
};
