module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define(
    "User",
    {
      nickname: {
        type: Datatypes.STRING(20),
        allowNull: false
      },
      email: {
        type: Datatypes.STRING(100),
        allowNull: false
      },
      password: {
        type: Datatypes.STRING(100),
        allowNull: false
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci" //한글 저장
    }
  );

  User.associate = db => {
    db.User.hasMany(db.Post, { as: "Posts" }); //내 포스트
    db.User.belongsToMany(db.Post, { through: "Favorite", as: "Favorites" }); //내가 좋아하는 글
    db.User.hasMany(db.Comment, { as: "Comments" }); //내 댓글
    db.User.hasOne(db.Image, { as: "Profile" }); //내 프로필 사진
    db.User.belongsToMany(db.Product, { through: "Interest", as: "Interests" }); // 내가 좋아하는 상품
    db.User.belongsToMany(db.Product, { through: "Buy", as: "products" }); //내가 산 상품
  };

  return User;
};
