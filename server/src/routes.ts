import express from 'express';
import { celebrate, Joi } from 'celebrate';

import multer from 'multer'
import multerConfig from './config/multer';

import CollectionPointController from './controllers/CollectionPointController';
import ItemController from './controllers/ItemController';

const routes = express.Router();
const upload = multer(multerConfig);

const collectionPointController = new CollectionPointController();
const itemController = new ItemController();

routes.get('/items', itemController.index);

routes.get('/collection_points', collectionPointController.index);
routes.get('/collection_points/:id', collectionPointController.show);
routes.delete('/collection_points/:id', collectionPointController.delete);
routes.post(
    '/collection_points',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            phone: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
            street: Joi.string().required(),
            number: Joi.number().required(),
            items: Joi.string().regex(/^[0-6]{1}((,[0-6]){0,5})$/).required(),
        }),
    }, {
        abortEarly: false
    }),
    collectionPointController.create
);

export default routes;
