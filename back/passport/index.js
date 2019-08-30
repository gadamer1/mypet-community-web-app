const local = require("./local");
const db = require("../models");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = db.User.findOne({
        where: { id },
        include: [
          {
            model: db.Post,
            as: "Posts",
            attributes: ["id"]
          },
          {
            model: db.Image,
            as: "Profile"
          }
        ]
      });
      return done(null, user); //req.user
    } catch (e) {
      console.error(e);
      done(e);
    }
  });

  local(passport);
};
