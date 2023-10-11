import * as Joi from 'joi';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './constants';

export const dbValidationSchema = {
  [DB_HOST]: Joi.string().required(),
  [DB_NAME]: Joi.string().required(),
  [DB_PASS]: Joi.string().required(),
  [DB_USER]: Joi.string().required(),
  [DB_PORT]: Joi.number().required(),
};
