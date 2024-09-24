import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username").notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.specificType('posts', 'integer[]');
    table.specificType('artists', 'text[]');
    table.specificType('genre', 'text[]');
    table.specificType('friends', 'integer[]');
    table.string("image").notNullable();
    table.string("description");
    table.integer('location_long').notNullable();  // Added parentheses
    table.integer('location_lat').notNullable();   // Added parentheses
    table.integer('radius');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
