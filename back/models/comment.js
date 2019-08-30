module.exports = (sequelize, Datatypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        type: Datatypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_cli"
    }
  );

  Comment.associate = db => {
    db.Comment.belongsToMany(db.Post);
    db.Comment.belongsToMany(db.User);
    db.Comment.belongsToMany(db.Product);
    db.Comment.hasMany(db.Image);
  };

  return Comment;
};
