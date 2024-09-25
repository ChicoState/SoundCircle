import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("comments", (table) => {
    table.increments("commentID").primary(); // auto-incrementing primary key
    table.text("comment").notNullable(); // comment text
    table.integer("postID").unsigned().notNullable(); // foreign key to posts table
    table.integer("userID").unsigned().notNullable(); // foreign key to users table
    table.specificType("reactions", "integer[]").defaultTo('{}'); // array of reaction IDs
    table.timestamps(true, true); // created_at and updated_at timestamps

    // Set foreign key constraints
    table.foreign("postID").references("posts.postID").onDelete("CASCADE");
    table.foreign("userID").references("users.id").onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("comments");
}
