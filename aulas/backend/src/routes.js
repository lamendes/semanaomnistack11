const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joy.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whastapp: Joi.string().required().min(10).min(11),
      city: Joi.string().required(),
      uf: Joi.number().required().length(2),
    }),
  }),
  OngController.create,
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index,
);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joy.object().keys({
      page: Joi.number(),
    }),
  }),
  IncidentController.index,
);

routes.post('/incidents', IncidentController.create);

routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joy.object().keys({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete,
);

module.exports = routes;
