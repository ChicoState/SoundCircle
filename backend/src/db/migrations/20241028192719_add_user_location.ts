import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    // Open up the posts table in the DB
    await knex.schema.alterTable("users", (table) => {
        table.string('locationName');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        table.dropColumn('locationName');
    });
}

