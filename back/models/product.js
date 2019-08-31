module.exports = (sequelize, Datatypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: Datatypes.STRING(100),
        allowNull: false
      },
      cost: {
        type: Datatypes.INTEGER,
        allowNull: true
      },
      define: {
        type: Datatypes.TEXT,
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

  Product.associate = db => {
    db.Product.hasMany(db.Image, { as: "Images" });
    db.Product.belongsToMany(db.User, {
      through: "Interest",
      as: "Interester"
    });
    db.Product.belongsToMany(db.User, { through: "Buy", as: "Author" });
    db.Product.belongsToMany(db.Post, { through: "Review", as: "Reviews" });
    db.Product.hasMany(db.Comment);
  };

  return Product;
};
