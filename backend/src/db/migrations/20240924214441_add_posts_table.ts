import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id").primary().unsigned().notNullable();
    table.specificType('comments', 'integer[]');
    table.integer("userID").unsigned().notNullable();
    table.integer("Reaction");
    table.string("post_content");

    // Foreign key constraint
    table.foreign("userID").references("id").inTable("users").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("posts");
}
