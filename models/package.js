module.exports = function(sequelize, DataTypes) {
  var Package = sequelize.define("Package", {
    packageName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    status: {
      type: DataTypes.Boolean,
      defaultValue: false,
      len: [1]
    },
    creator: {
      type: DataTypes.STRING,
      defaultValue: "Bob"
    },
    updater:{
	  type: DataTypes.STRING,
      defaultValue: "Bob"
    },
    pickUpDate{
      type: DataTypes.Date,
      allowNull:true	
    }
  });

  Package.associate = function(models) {
    Package.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Package;
};
