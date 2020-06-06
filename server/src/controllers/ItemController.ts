import { Request, Response } from 'express';
import knex from '../database/connection';
import server from '../config/server';

class ItemController {
    async index (request: Request, response: Response) {
        const items = await knex('item').select('*');
    
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${server.localhost_ip}/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }
};

export default ItemController;
