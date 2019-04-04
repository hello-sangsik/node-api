module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user',
        {
            username: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            underscored: true
        });
};