module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    position: {
      type: DataTypes.STRING,
      defaultValue: 'Resident',
      len: [1]
    },
    // Active: {
    //   type: DataTypes.Boolean,
    //   defaultValue: true
    // },
    uid:{
	    type: DataTypes.STRING,
      defaultValue: "Bob"
    },
    pwd:{
      type: DataTypes.STRING,
      allowNull:true	
    }
  });

  User.associate = function(models) {
    User.hasOne(models.UserInfo, {
      onDelete: "cascade"
    });

    User.hasMany(models.Package, {
      onDelete: "cascade"
    });
  };



  return User;
};
