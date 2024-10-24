import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        // Add user email column to table
        table.string('email');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        // Remove the new column if we rollback
        table.dropColumn('email');
    });
}
