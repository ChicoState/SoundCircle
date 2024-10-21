import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("posts", (table) =>{
        table.dropColumn("userID");
        table.dropColumn("Reaction");

        // Alter comments
        table.specificType('comments', 'text[]').alter();

        // Add columns
        table.string('username');
        table.integer('user_id');
        table.integer('reactions');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("posts", (table) => {
        table.integer("userID").unsigned().notNullable();
        table.integer("Reaction");
        
        // Alter comments
        table.specificType('comments', 'integer[]').alter();

        table.dropColumn('user_id');
        table.dropColumn('reactions');
        table.dropColumn('username');
    });
}

