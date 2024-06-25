require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// Passport
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo'); // Instantiate MongoStore with session

// GraphQL
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolver");
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServer } = require('apollo-server-express');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const http = require('http');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'https://667951ef235f9b8856a5c301--effervescent-medovik-27cf5c.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    console.log("Request origin:", origin);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Strip trailing slash from origin if it exists
    const formattedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
    if (allowedOrigins.indexOf(formattedOrigin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      console.log(msg);
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(
  session({
    secret: process.env.SECRET, // Fixed typo in 'SECRET'
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

const userRoutes = require("./routes/userRoute"); // Fixed space in path
const qaRoutes = require("./routes/q-a");

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/qa", qaRoutes);

// GraphQL and subscription 

const httpServer = http.createServer(app);
const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/subscriptions',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
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

startApolloServer();

const port = process.env.PORT || 4000;
httpServer.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
});

module.exports = app;
