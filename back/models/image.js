module.exports = (sequelize, Datatypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: Datatypes.STRING(200),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_cli"
    }
  );

  Image.associate = db => {
    db.Image.belongsTo(db.User);
    db.Image.belongsTo(db.Comment);
    db.Image.belongsTo(db.Post);
    db.Image.belongsTo(db.Product);
  };
  return Image;
};
