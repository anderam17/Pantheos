module.exports = function (sequelize, DataTypes) {
    const Teacher = sequelize.define("Teacher", {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },

        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },

        subject: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    });

    Teacher.associate = function (models) {
        Teacher.hasMany(models.Students)
    }

    return Teacher;
};

