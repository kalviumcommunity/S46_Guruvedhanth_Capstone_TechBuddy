require("dotenv").config();
const mongoose = require("mongoose");
const express =require("express");
const cors = require("cors");

// Passport
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo'); // Instantiate MongoStore with session

// graphql
const typeDefs =require("./graphql/typedefs")
const resolvers=require("./graphql/resolver")
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const http = require('http');
const cookieParser = require('cookie-parser');


const app = express()

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors({
  origin: 'https://667951ef235f9b8856a5c301--effervescent-medovik-27cf5c.netlify.app',
  credentials: true
}));
app.use(
  session({
    secret: process.env.SECERET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);


const userRoutes=require("./routes/userRoute")
const qaRoutes =require("./routes/q-a")

app.use(express.json());
app.use("/api/user",userRoutes);
app.use("/api/qa",qaRoutes);

// graphql and subscription 

const httpServer = http.createServer(app)
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  // This is the httpServer we created in a previous step.
  server: httpServer,
  // Pass a different path here if app.use
  // serves expressMiddleware at a different path
  path: '/subscriptions',
});

// Hand in the schema we just created and have the
// WebSocketServer start listening.
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
      async serverWillStart() {
          return {
          async drainServer() {
              await serverCleanup.dispose();
          },
          };
      },
      },
  ],
});

async function startApolloServer() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB Atlas');

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer()

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
console.log(` Server ready at http://localhost:${port}${server.graphqlPath}`);
});


module.exports = app;