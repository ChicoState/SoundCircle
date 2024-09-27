import knex from 'knex';
import knexfile from './knexfile';

const env = 'development';
const configOptions = knexfile[env];

export default knex(configOptions);
