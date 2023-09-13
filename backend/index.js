import http from 'http';
import PG from 'pg'

const port = Number(process.env.port);
const user = process.env.db_user
const host = process.env.db_url
const db_port = process.env.db_port
const password = process.env.db_password
const database = process.env.db_name

const connectionString = `postgres://${user}:${password}@${host}:${db_port}/${database}`
const client = new PG.Client(connectionString)

http.createServer(async (req, res) => {
  console.log(`Request: ${req.url}`);
  if (req.url === "/") {
    try {
      await client.connect();
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      let result;
      result = (await client.query("SELECT * FROM users")).rows[0];
      const data = {
        database: true,
        userAdmin: result?.role === "admin"
      }
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error(error.stack);
    } finally {
      await client.end();
    }
  } else if (req.url === "/health") {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(JSON.stringify({health: "ok"}));
  }else {
    res.writeHead(503);
    res.end("Internal Server Error");
  }

}).listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});