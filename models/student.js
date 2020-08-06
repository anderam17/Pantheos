module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define("Student", {
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
            },
        },

        grade: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 6,
                max: 8
            },

            detention: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        }
    });

    Student.associate = function (models) {
        Student.belongsTo(models.Teacher, {
            foreignKey: {
                allowNull: false
            },
        });
    }

    return Student;
};




