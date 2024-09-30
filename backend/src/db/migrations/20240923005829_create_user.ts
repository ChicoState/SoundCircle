import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.specificType('artists', 'text[]');       // Array of text
    table.specificType('genres', 'text[]');        // Array of text
    table.specificType('friends', 'integer[]');    // Array of integers
    table.string("image");                         // Image URL or path
    table.string("description");                   // Description field
    table.float('longitude');                      // More precision for coordinates
    table.float('latitude');                       // More precision for coordinates
    table.float('radius');                         // Float for precision, depends on use case
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}
