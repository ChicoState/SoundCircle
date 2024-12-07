import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("posts", (table) => {
        table.dropColumn("comments");
        table.specificType("comment_ids", "integer[]");
    });

    await knex.schema.dropTableIfExists("comments");

    await knex.schema.createTable("comments", (table) => {
        table.increments("id").primary().unsigned().notNullable();
        table.integer("user_id");
        table.string("username");
        table.text("comment_content");
        table.integer("reactions");
        table.dateTime("created_at");
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("posts", async (table) => {
        table.dropColumn("comment_ids");
        table.specificType("comments", "text[]");
    });

    await knex.schema.dropTableIfExists("comments");

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

