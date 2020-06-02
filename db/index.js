const { Pool } = require("pg"); //       postgres://angel:gelo96@localhost:5432/angel

exports.database = async (text, params) => {
  let pool;
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  } else {
    pool = new Pool({
      connectionString: "postgres://angel:gelo96@localhost:5432/agenda",
    });
  }

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
