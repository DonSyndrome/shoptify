/* eslint-disable no-console */
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const addRequestId = require('express-request-id')();
const cookieParser = require('cookie-parser');
const next = require('next');
const config = require('./src/config/config');
// spotify Routes
const spotifyLogInRoute = require('./src/api/spotify/spotifyLogInRoute');
const spotifyCallbackRoute = require('./src/api/spotify/spotifyCallbackRoute');
const SpotifyRefreshToken = require('./src/api/spotify/SpotifyRefreshToken');
// new Data Routes
const playlistRoutes = require('./src/api/playlist/playlist.routes');
// midelwares
const Auth = require('./src/middleware/Auth');
const getHttpsRedirectMiddleware = require('./src/middleware/redirectHttpMiddleware');


const dev = process.env.NODE_ENV !== 'production';
console.log(`app is startind in: ${dev ? 'dev' : 'production'} mode`);
console.log(`app is runing in: ${process.env.SITE_URL}`);
const nextApp = next({ dev, conf: { distDir: '.next' } });
const handle = nextApp.getRequestHandler();

const nextHandler = (req, res) => handle(req, res);
nextApp.prepare().then(() => {
  const app = express();
  const httpsPort = app.get('https-port');
  app.use(getHttpsRedirectMiddleware({ httpsPort }));
  app.set('trust proxy');
  console.log(`connecting to db:${process.env.MONGO_DB}`);
  config.connectDB(app);

  // Generate UUID for request and add it to X-Request-Id header. To work along with morgan logging.
  // Adding a request id to the request object, to facilitate tying different log entries
  // to each other So a Request log and its associated Response log would have the same id.
  app.use(addRequestId);
  app.use(morgan()); // I am both writing to a log file while showing logs on the console.
  app.use(methodOverride('_method'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  morgan.token('id', req => req.id);

  // Morgan - For saving logs to a log file
  const accessLogStream = fs.createWriteStream(`${__dirname}/access.log`, {
    flags: 'a',
  });

  // my custom log format, just adding ":id" to the pre-defined "combined" format from morgan
  // let loggerFormat =
  //   ':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"
  //   :status :res[content-length] ":referrer" ":user-agent" :req[header] :response-time ms';

  const loggerFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

  app.use(morgan(loggerFormat, { stream: accessLogStream }));

  // Below two functions are for showing logs on the console. Define streams for Morgan.
  // This logs to stderr for status codes greater than 400 and stdout for status codes less 400.
  app.use(
    morgan(loggerFormat, {
      skip(req, res) {
        return res.statusCode < 400;
      },
      stream: process.stderr,
    }),
  );

  app.use(
    morgan(loggerFormat, {
      skip(req, res) {
        return res.statusCode >= 400;
      },
      stream: process.stdout,
    }),
  );


  app.use('/api/playlist', playlistRoutes);

  app.get('/login-with-spotify', spotifyLogInRoute);
  app.get('/refresh-spotify-token', Auth.isAuthenticated, SpotifyRefreshToken);
  app.get('/spotify-callback', spotifyCallbackRoute);

  // defence the admin routes in the middleware level
  app.use('/admin/', Auth.isAuthenticated);
  // Only now, AFTER the above /api/ routes, the next hendler function
  app.get('*', nextHandler);

  app.use((err, req, res, _next) => {
    // eslint-disable-next-line no-underscore-dangle
    res.status(422).send({ error: err._message });
  });

  app.listen(8080, () => {
    console.log('Express Server running on port 8080');
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});

// Graceful shutdown, on sigint ( generated with <Ctrl>+C in the terminal )
// - kill/close database connection and exit
process.on('SIGINT', () => {
  config.disconnectDB();
  process.exit(0);
});
