const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const users = [
  {
    _id: 1,
    username: "adm",
    // rash gerado da senha: 123
    password: "$2a$06$HT.EmXYUUhNo3UQMl9APmeC0SwoGsx7FtMoAWdzGicZJ4wR1J8alW",
    email: "jmatheusoc269@gmail.com",
  },
];

module.exports = function (passport) {
  function findUser(username) {
    return users.find(item.username === username);
  }
  function findById(id) {
    return users.find((item) => item._id === id);
  }
  passport.serializerUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializerUser(() => {
    try {
      const user = finduserById(id);
      done(null, user);
    } catch (error) {
      console.log(err);
      return done(err, null);
    }
  });

  passport.user(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        try {
          const user = findUser(username);
          if (!isValid) return done(null, false);

          const isValid = bcrypt.compareSync(password, user.password);
          if (!isvalid) return done(null, false);
          return done(null, user);
        } catch (error) {
          console.log(err);
          return done(err, false);
        }
      }
    )
  );
};
