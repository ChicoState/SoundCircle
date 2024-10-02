import dotenv from 'dotenv';
import path from 'path';

// Dynamically resolve the path to the .env file
const envPath = path.resolve("backend/.env.local", '../../.env.local');
dotenv.config({ path: envPath });

const { PG_USER, PG_PASSWORD, PG_DATABASE } = process.env;

const connectionString = `postgres://${PG_USER}:${PG_PASSWORD}@localhost:5433/${PG_DATABASE}`;

const knexfile = {
  development: {
    client: 'pg',
    connection: connectionString,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: '../db/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  testing: {
    client: 'pg',
    connection: connectionString,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: '../db/migrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'pg',
    connection: connectionString,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: '../db/migrations',
    },
    seeds: { directory: './data/seeds' },
  },
};

export default knexfile;
