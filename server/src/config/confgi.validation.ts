import * as Joi from 'joi';
import {
  END_WORK_TIME,
  LATENESS_TIME,
  OVERTIME_TIME,
  PORT,
  START_WORK_TIME,
} from './constants';

export const appValidationSchema = {
  [PORT]: Joi.number().required(),
  [START_WORK_TIME]: Joi.number().required(),
  [END_WORK_TIME]: Joi.number().required(),
  [LATENESS_TIME]: Joi.number().required(),
  [OVERTIME_TIME]: Joi.number().required(),
};
