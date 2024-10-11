import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
// import { Order, Review } from '@modules';

export enum UserRoles {
  user = 'USER',
  admin = 'ADMIN',
}

@Table({ tableName: 'user', timestamps: true })
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  // @Column({type: DataType.INTEGER, allowNull: true })
  // telegram_id?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  image?: string;

  @Column({
    type: DataType.ENUM,
    values: [UserRoles.admin, UserRoles.user],
    allowNull: false,
    defaultValue: UserRoles.user,
  })
  role: UserRoles;

  // @HasMany(() => Order)
  // orders: Order[];
}
