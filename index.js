const jsonServer = require('json-server');
const auth = require('json-server-auth');
const fs = require('fs');
const path = require('path');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Carica il database
const router = jsonServer.router('db.json');

// Leggi le regole dal file routes.json
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'routes.json')));

// Configura il rewriter con le regole
server.use(jsonServer.rewriter(routes));

// Configura i middlewares
server.use(middlewares);

// You must apply the auth middleware before the router
server.use(auth);

// Bind the router db to the server
server.db = router.db;

// Apply the router
server.use(router);

// Start the server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

// Regole di autenticazione
const rules = auth.rewriter({
  // Permission rules
  users: 600,
  posts: 640,
  // Other rules
  '/posts/:category': '/posts?category=:category',
});

// Apply the rules
server.use(rules);