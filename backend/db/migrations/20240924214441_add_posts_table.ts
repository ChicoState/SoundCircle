import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("posts", (table) => {
    table.increments("postID").primary(); // auto-incrementing primary key
    table.integer("userID").unsigned().notNullable(); // foreign key to users table
    table.specificType("comments", "integer[]"); // array of comment IDs
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("posts");
}
