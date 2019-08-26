module.exports = (sequelize,DataTypes)=>{
    sequelize.define('user',{
        email:{
            type: DataTypes.STRING(40),
            allowNull : false,
            unique: true,
        },
        nickname: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password : {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        snsId:{
            type : DataTypes.STRING(30),
            allowNull: true,
        }
    },{
        timeStamps : true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_cli',
    })
};