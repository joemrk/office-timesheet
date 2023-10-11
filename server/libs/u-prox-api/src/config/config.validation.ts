import * as Joi from 'joi';
import {
  U_PROX_API_LOGIN_INTERVAL,
  U_PROX_API_PASS,
  U_PROX_API_PASS_HASH_PHRASE,
  U_PROX_API_URL,
  U_PROX_API_USER,
} from './constants';

export const configValidationSchema = Joi.object({
  [U_PROX_API_URL]: Joi.string().required(),
  [U_PROX_API_USER]: Joi.string().required(),
  [U_PROX_API_PASS]: Joi.string().required(),
  [U_PROX_API_PASS_HASH_PHRASE]: Joi.string().required(),
  [U_PROX_API_LOGIN_INTERVAL]: Joi.number().required(),
});
