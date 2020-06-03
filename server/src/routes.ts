import express from 'express';

import CollectionPointController from './controllers/CollectionPointController';
import ItemController from './controllers/ItemController';

const routes = express.Router();
const collectionPointController = new CollectionPointController();
const itemController = new ItemController();

routes.get('/items', itemController.index);

routes.post('/collection_points', collectionPointController.create);
routes.get('/collection_points', collectionPointController.index);
routes.get('/collection_points/:id', collectionPointController.show);
routes.delete('/collection_points/:id', collectionPointController.delete);

export default routes;
