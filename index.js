const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Sostituisci 'db.json' con il tuo file JSON
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Imposta i middlewares
server.use(middlewares);

// Regole di json-server-auth
const rules = auth.rewriter({
  // Regole di esempio
  users: 600,
  messages: 640,
  posts: 660
});

// Usa le regole e l'autenticazione
server.use(rules);
server.use(auth);
server.use(router);

// Avvia il server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
