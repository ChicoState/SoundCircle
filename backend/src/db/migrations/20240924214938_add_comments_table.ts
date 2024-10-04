import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("comments", (table) => {
    table.increments("id").primary().unsigned().notNullable();
    table.integer("userID").unsigned().notNullable();
    table.integer("postID").unsigned().notNullable();
    table.string("comment");
    table.integer("reactions");

    // Foreign key constraints
    table.foreign("userID").references("id").inTable("users").onDelete("CASCADE");
    table.foreign("postID").references("id").inTable("posts").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("comments");
}