const { Client } = require('pg'); // imports the pg module

// supply the db name and location of the database
const client = new Client('postgres://localhost:5432/juicebox-dev');


client.query(`
  INSERT INTO users(username, password) VALUES ($1, $2);
`, ["some_name", "some_password"]);

module.exports = {
    client,
}

async function getAllUsers() {
    const { rows } = await client.query(
        `SELECT id, username 
      FROM users;
    `);

    return rows;
}

async function createUser({ username, password }) {
    try {
        const { rows } = await client.query(
            `SELECT id, username 
          FROM users;
        `);

        return rows;
    } catch (error) {
        throw error;
    }
}

// later
module.exports = {
    createUser,
    client,
    getAllUsers,
}