import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('collection_points_items', table => {
        table.increments('id').primary();

        table.integer('collection_point_id')
            .notNullable()
            .references('id')
            .inTable('collection_point');        ;
        
        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('item');
    });
};

export async function down(knex: Knex) {
    return knex.schema.dropTable('collection_points_items');
};
