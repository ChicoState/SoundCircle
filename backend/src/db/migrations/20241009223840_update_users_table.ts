import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("users", (table) => {
        table.string('username').notNullable().unique();
        table.json('userPostIds').defaultTo((JSON.stringify([]))); // Default to empty array
        table.json('currentLocation').defaultTo((JSON.stringify([]))); // Default to empty array
        table.timestamp('created_at').defaultTo(knex.fn.now());

        // We're dropping all of these FOR NOW so we can begin testing User information
        table.dropColumn('artists');
        table.dropColumn('genres');
        table.dropColumn('longitude');
        table.dropColumn('latitude');
        table.dropColumn('radius');
        table.dropColumn('description');
        table.dropColumn('image');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", (table) => {
        // Re-add dropped columns
        table.specificType('artists', 'text[]');       // Array of text
        table.specificType('genres', 'text[]');        // Array of text
        //table.specificType('friends', 'integer[]');    // Array of integers
        table.string("image");                         // Image URL or path
        table.string("description");                   // Description field
        table.float('longitude');                      // More precision for coordinates
        table.float('latitude');                       // More precision for coordinates
        table.float('radius');                         // Float for precision, depends on use case
   
        // Drop any added columns
        table.dropColumn('username');
        table.dropColumn('userPostIds'); // Default to empty array
        table.dropColumn('currentLocation'); // Default to empty array
        table.dropColumn('created_at');
    });
}

