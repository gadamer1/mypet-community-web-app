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
      collate: "utf8mb4_general_ci"
    }
  );

  Comment.associate = db => {
    db.Comment.belongsTo(db.Post);
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Product);
    db.Comment.hasMany(db.Image);
  };

  return Comment;
};
