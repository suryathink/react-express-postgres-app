import { Model, DataTypes } from "sequelize";
import sequelize from "../configs/database";
import User from "./User.js";

class Task extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public userId!: string;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

Task.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });

export default Task;
