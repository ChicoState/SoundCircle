import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('events', (table) => {
        table.increments('id').primary().unsigned()
        table.string('event_name')
        table.date('event_date')
        table.time('start_time')
        table.time('end_time')
        table.string('location')
        table.float('latitude')
        table.float('longitude')
        table.string('location_name')
        table.specificType('bands', 'text[]')
        table.text('description')
        table.specificType('genres', 'text[]')
        table.decimal('ticket_price', 10, 2)
        table.timestamps(true, true); // Automatically adds created_at and updated_at columns
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('events');
}

