const { Pool } = require("pg");

exports.database = async (text, params) => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    const client = await pool.connect();
    let result = null;
    if (params == null) {
      result = await client.query(text);
    } else {
      result = await client.query(text, params);
    }
    const results = result.rows;
    client.end();
    return results;
  } catch (err) {
    console.error(err);
    return err;
  }
};
