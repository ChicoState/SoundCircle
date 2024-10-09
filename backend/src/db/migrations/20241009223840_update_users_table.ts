import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        table.increments("id").primary();
        table.string('username').notNullable().unique();
        table.json('userPostIds').defaultTo((JSON.stringify([]))); // Default to empty array
        table.json('currentLocation').defaultTo((JSON.stringify([]))); // Default to empty array
        table.timestamp('created_at').defaultTo(knex.fn.now());

        // We're dropping all of these FOR NOW so we can begin testing User information
        table.dropColumn('artists');
        table.dropColumn('genres');
        table.dropColumn('longitude');
        table.dropColumn('latitude');
        table.dropColumn('radius');
        table.dropColumn('description');
        table.dropColumn('image');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}

