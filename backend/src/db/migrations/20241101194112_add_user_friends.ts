import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        // Add integer column for user friends
        table.specificType('friends', 'integer[]');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        // Drop the column we just created if there is a rollback
        table.dropColumn('friends');
    });
}

