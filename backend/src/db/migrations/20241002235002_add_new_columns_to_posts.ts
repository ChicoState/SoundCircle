import type { Knex } from "knex";

// Added a 'created_at' column to 'posts' table
// with default value of current database time
export async function up(knex: Knex): Promise<void> {
    await knex.schema.table("posts", (table) => {
        table.timestamp("created_at").defaultTo(knex.fn.now());
    });
}

// Remove 'created_at' column if rolled back
export async function down(knex: Knex): Promise<void> {
    await knex.schema.table("posts", (table) => {
        table.dropColumn("created_at");
    });
}
