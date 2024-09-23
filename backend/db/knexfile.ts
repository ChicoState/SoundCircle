const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: "backend/.env.local" });
const { PG_USER, PG_PASSWORD, PG_DATABASE } = process.env;


// Update with your config settings.

const config = {
  development: {
    client: 'postgresql',
    connection: {
      database: PG_DATABASE,
      user: PG_USER,
      password: PG_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
};

module.exports = config;
