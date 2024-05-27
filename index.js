const jsonServer = require('json-server');
const auth = require('json-server-auth');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Leggi le regole dal file routes.json
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json')));

// Configura il rewriter con le regole
server.use(jsonServer.rewriter(routes));

// Usa i middlewares e json-server-auth
server.use(middlewares);
server.use(auth);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
