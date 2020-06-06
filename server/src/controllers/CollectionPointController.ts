import { Request, Response } from 'express';
import knex from '../database/connection';

import server from '../config/server';

class CollectionPointController {
    async create (request: Request, response: Response) {
        const {
            name,
            email,
            phone,
            latitude,
            longitude,
            uf,
            city,
            street,
            number,
            items
        } = request.body;
    
        const trx = await knex.transaction();   //opens a transaction
    
        const collection_point = {
            name,
            email,
            phone,
            latitude,
            longitude,
            uf,
            city,
            street,
            number,
            image: request.file.filename
        };

        const insertedIds = await trx('collection_point').insert(collection_point);
    
        const collection_point_id = insertedIds[0];
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {
                return {
                    item_id,
                    collection_point_id,
                };
            });
    
        await trx('collection_points_items').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: collection_point_id,
            ...collection_point,
        });
    };

    async delete(request: Request, response: Response) {
        const { id } = request.params;
      
        const deletedId = await knex('collection_point')
          .where('id', id)
          .del();
      
        return response.json(deletedId);
    };

    async index (request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const collection_points = await knex('collection_point')
            .join('collection_points_items', 'collection_point.id', '=',
                'collection_points_items.collection_point_id')
            .whereIn('collection_points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('collection_point.*');

            console.log('\n\n\nAQUI\n\n\n\n');
            console.log(server.localhost_ip);

        const serializedPoints = collection_points.map(point => {
            return {
                ...point,
                image_url: `${server.localhost_ip}/uploads/${point.image}`,
            };
        });

        return response.json(serializedPoints);
    };

    async show (request: Request, response: Response) {
        const { id } = request.params;

        const collection_point = await knex('collection_point')
            .where('id', id)
            .first();

        if (!collection_point) {
            return response.status(400)
                .json({ message: 'Collection Point not found.' });
        }

        const serializedPoint = {
            ...collection_point,
            image_url: `${server.localhost_ip}/uploads/${collection_point.image}`,
        };

        const items = await knex('item')
            .join('collection_points_items', 'item.id',
                '=', 'collection_points_items.item_id')
            .where('collection_points_items.collection_point_id', id)
            .select('item.title');

        return response.json({ serializedPoint, items });
    };
};

export default CollectionPointController;
