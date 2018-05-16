const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
require('dotenv').config({ path: 'variables.env' });

// GraphQL-Express Packages
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// Brings in Schema and Resolvers
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// Creates Executable Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Connects to Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initializes app
const app = express();

// Sets up GraphiQL application @ /graphiql
app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

// Sets up Express middleware
app.use(
  "/graphql",
  cors('*'),
  bodyParser.json(),
  graphqlExpress({ schema, context: { Recipe, User } })
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});