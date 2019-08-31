module.exports = (sequelize, Datatypes) => {
  const Post = sequelize.define(
    "Post",
    {
      content: {
        type: Datatypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8mb4", //이모티콘
      collate: "utf8mb4_general_ci"
    }
  );

  Post.associate = db => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.User, { through: "Favorite", as: "Favorites" });
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Product, { through: "Review", as: "Products" });
  };

  return Post;
};
