const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = {
  database: process.env.MONGO_DB,

  options: {
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 1000, // Reconnect every 500ms
    useNewUrlParser: true,
    poolSize: 10, // Maintain up to 10 socket connections
  },

  // Connect connection with MongoDB Database
  connectDB: function connectDB(app) {
    const mongoDb = mongoose.connect(this.database, this.options);
    //  add the mongodb and the mod
    app.use(session({
      name: 'qid',
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      cookie: {
        // secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // day
      },
    }));
    app.use((req, res, next) => {
      req.mongodb = mongoDb;
      // Logging req.mysqldb/req.mongodb at this point gives the correct result.
      next();
    });
  },

  // Disconnect connection with MongoDB Database
  disconnectDB() {
    mongoose.disconnect(this.database);
  },
};
// on mongo connection open event print a console statement
mongoose.connection.on('open', () => {
  console.log('Connected to Database (MongoDB) ');
});

// on mongo connection error event
mongoose.connection.on('error', () => {
  console.log('error in Database (MongoDB) connections');
});

// on mongo connection disconnected event
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// listen for SIGINT event(generated with <Ctrl>+C in the terminal)
// and close db connection on that event
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/* Our application exits ( generated with 'SIGINT' event ) will also close database connection.

What is the cause? - EventLoop

As we know NodeJS will exit when EventLoop queue is empty and nothing left to do.

But sometime your application can have more functions and will not exit automatically,
in this point comes our last work to do.
We need to exit from process using process.exit function.

Argument 0 means exit with a “success” code.
To exit with a “failure” code use 1.
*/
