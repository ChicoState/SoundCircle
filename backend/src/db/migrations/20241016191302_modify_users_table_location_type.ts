import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        // remove old latLong column
        table.dropColumn('currentLocation');
        
        // Create new lat and long variables
        table.float('latitude');
        table.float('longitude');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        // remove our new columns
        table.dropColumn('latitude');
        table.dropColumn('longitude');
        
        // readd the old column
        table.json('currentLocation').defaultTo((JSON.stringify([]))); // Default to empty array
    });
}

