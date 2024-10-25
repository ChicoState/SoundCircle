import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Open up the posts table in the DB
    await knex.schema.alterTable("posts", (table) => {
        // Add location name to the posts table for
        // display purposes.
        table.string('locationName');

        // Add the columns for coordinates
        table.float('latitude');
        table.float('longitude');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("posts", (table) => {
        // Remove the location columns if we rollback
        table.dropColumn('locationName');
        table.dropColumn('latitude');
        table.dropColumn('longitude');
    });
}

