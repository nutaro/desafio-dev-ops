import http from 'http';
import PG from 'pg';

const port = Number(process.env.port);
const user = process.env.db_user
const host = process.env.db_url
const db_port = process.env.db_port
const password = process.env.db_password

const client = new PG.Client(
  `postgres://${user}:${password}@${host}:${db_port}`
);

let successfulConnection = false;

http.createServer(async (req, res) => {
  console.log(`Request: ${req.url}`);

  if (req.url === "/api") {
    await client.connect()
      .then(() => { successfulConnection = true })
      .catch(err => console.error('Database not connected -', err.stack));

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);

    let result;

    try {
      result = (await client.query("SELECT * FROM users")).rows[0];
    } catch (error) {
      console.error(error)
    }

    const data = {
      database: successfulConnection,
      userAdmin: result?.role === "admin"
    }

    res.end(JSON.stringify(data));
  } else {
    res.writeHead(503);
    res.end("Internal Server Error");
  }

}).listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});