const { Pool, Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://svnawitzbkgeah:d73b0a517ec6d3c62ad34eeb6e33ab11e8f5f84218555752c003fcb06afd9dd2@ec2-18-214-208-89.compute-1.amazonaws.com:5432/d19oo29o8t8tum";

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});
const client = new Client();

module.exports = {
  client: client,
  pool: pool,
};
