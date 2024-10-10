import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Drop any existing users table
    await knex.schema.dropTableIfExists("users");
    // Create a new users table
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary().notNullable();
        table.string('username').notNullable().unique();
        table.json('userPostIds').defaultTo((JSON.stringify([]))); // Default to empty array
        table.json('currentLocation').defaultTo((JSON.stringify([]))); // Default to empty array
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}

