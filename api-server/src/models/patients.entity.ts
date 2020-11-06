//import { Sequelize, DataType } from 'sequelize';
import * as bcrypt from 'bcrypt';

import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  HasMany,
  CreatedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import sequelize = require('sequelize');

import { User } from './users.entity';

@Table({
  tableName: 'patients',
  timestamps: false
})
export class Patient extends Model<Patient> {
  //Ejemplo
  /* @Column({
    type: DataType.BOOLEAN, DataType.INTEGER({ length: 11 }), DataType.STRING(45), DataType.DATE,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    defaultValue: false,
    field: 'have_image',
  })
  haveImage: string; */

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    field: 'idPatient',
  })
  public idPatient: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    defaultValue: false,
    field: 'idMonitor',
  })
  public idMonitor: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    defaultValue: false,
    field: 'idUserPatient',
  })
  public idUserPatient: string;

  @BelongsTo(() => User, 'idMonitor')
  monitor: User;

  @BelongsTo(() => User, 'idUserPatient')
  patient: User;

}
