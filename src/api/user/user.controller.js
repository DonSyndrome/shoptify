const User = require('./user.dal');
const userYup = require('./user.yup');
const user4example = {
  country: 'IL',
  display_name: 'Shahar Ram',
  email: 'shaharram96@gmail.com',
  explicit_content: { filter_enabled: false, filter_locked: false },
  external_urls: { spotify: 'https://open.spotify.com/user/12177313615' },
  followers: { href: null, total: 21 },
  href: 'https://api.spotify.com/v1/users/12177313615',
  id: '12177313615',
  images: [{
    height: null,
    url: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/58667527_2478818132128470_5402324729514164224_n.jpg?_nc_cat=102&_nc_ohc=D3q19BI9m3YAQk3T3FyD_yG0Jkoa9C7DPmgyRfjwzWATh8w5xOb66e0CQ&_nc_ht=scontent.xx&oh=1422d4e4adbae7ffc01f29b2fc44805b&oe=5E487FD7',
    width: null,
  }],
  product: 'premium',
  type: 'user',
  uri: 'spotify:user:12177313615',
};
const userDefults = {
  display_name: '',
  email: '',
  id: 0, // The Spotify user ID for the user.
};
const createUser = function createUser(spotifyUser = userDefults) {
  const newUser = {};
  newUser.display_name = spotifyUser.display_name || '';
  newUser.email = spotifyUser.email || '';
  newUser.spotify_id = spotifyUser.id || 0; // The Spotify user ID for the user.

  userYup
    .validate(newUser)
    .then(ValidNewUser => User.create(ValidNewUser))
    .then((doc) => {
      console.log(doc);
      if (doc.errors) {
        throw Error(doc.errors);
      }
      // I h8 this rulz;
      // eslint-disable-next-line no-underscore-dangle
      const document = doc._doc;
      if (document) {
        return document;
        // res.json({
        //   message: 'Playlist created successfully',
        //   document,
        // });
      }
      return null;
    }).catch((err) => {
      console.log(err);
    });
};
exports.createUser = createUser;


exports.getOrCreateUser = function getOrCreateUser(spotifyUser = userDefults) {
  const userFromDB = User.findOneBySpotifyID({}, (user) => {
    console.log('this is the user form mongodb');
    console.log(user);
    return user;
  });

  if (userFromDB) {
    return userFromDB;
  }
  const user = createUser(spotifyUser);
  return user;

  // const newUser = {};
  // newUser.display_name = spotifyUser.display_name || '';
  // newUser.email = spotifyUser.email || '';
  // newUser.spotify_id = spotifyUser.id || 0; // The Spotify user ID for the user.

  // userYup
  //   .validate(newUser)
  //   .then(ValidNewUser => User.findOne({}))
  //   .then((doc) => {
  //     console.log(doc);
  //     if (doc.errors) {
  //       throw Error(doc.errors);
  //     }
  //     // I h8 this rulz;
  //     // eslint-disable-next-line no-underscore-dangle
  //     const document = doc._doc;
  //     if (document) {
  //       return document;
  //       // res.json({
  //       //   message: 'Playlist created successfully',
  //       //   document,
  //       // });
  //     }
  //     return null;
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  //   .finally(() => {

  //   });
};

// exports.createPlaylist = function createPlaylist(req, res, next) {
//   const newPlaylist = req.body;
//   // validate with formik also
//   userYup.validate(newPlaylist)
//     .then(ValidNewUser => User.create(ValidNewUser))
//     .then((doc) => {
//       console.log(doc);
//       if (doc.errors) {
//         throw Error(doc.errors);
//       }
//       // I h8 this rulz;
//       // eslint-disable-next-line no-underscore-dangle
//       const document = doc._doc;
//       if (document) {
//         res.json({
//           message: 'Playlist created successfully',
//           document,
//         });
//       }
//     }).catch((err) => {
//       console.log(err);
//       res.status(400).send(err);
//     });
// };

// exports.getUser = function getUser(req, res, next) {
//   User.get({}, (err, doc) => {
//     if (err) {
//       res.json({
//         error: err,
//       });
//     }
//     res.json({
//       doc,
//     });
//   });
// };

// exports.updatePlaylist = function updatePlaylist(req, res, next) {
//   const UpdatedPlaylist = req.body;
//   userYup.validate(UpdatedPlaylist)
//     .then(ValidNewPlaylist => User.update(
//       { playlist_slug: req.params.slug }, ValidNewPlaylist, (err, doc) => {
//         if (err) {
//           res.json({
//             error: err,
//           });
//         }
//         res.json({
//           message: 'Playlist updated successfully',
//           doc,
//         });
//       },
//     ))
//     .catch((err) => {
//       console.log(err);
//       res.status(400).send(err);
//     });
// };


// exports.removePlaylist = function removePlaylist(req, res, next) {
//   User.delete({ playlist_slug: req.params.slug }, (err, doc) => {
//     if (err) {
//       res.json({
//         error: err,
//       });
//     }
//     res.json({
//       message: 'Playlist deleted successfully',
//       doc,
//     });
//   });
// };
