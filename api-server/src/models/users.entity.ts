//import { Sequelize, DataType } from 'sequelize';
import * as bcrypt from 'bcrypt';

import {
  Table,
  Column,
  Model,
  DataType,
  BeforeCreate,
  HasMany,
  HasOne,
  CreatedAt,
} from 'sequelize-typescript';
//import * as sequelize from 'sequelize'; // Este import tiene las operaciones extra que se pueden hacer para personalizar las consultas por ejemplo
import { Patient } from './patients.entity';

@Table({
  tableName: 'users',
  timestamps: false
})
export class User extends Model<User> {
  //Ejemplo
  /* @Column({
    type: DataType.BOOLEAN, DataType.INTEGER({ length: 11 }), DataType.STRING(45), DataType.DATE,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    defaultValue: false,
    validate: { // DOC : https://sequelize.org/master/manual/validations-and-constraints.html
      notEmpty: {
        msg: 'Please enter your name'
      }
    }
    field: 'have_image',
    
  })
  haveImage: string; */

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    field: 'idUser',
  })
  public idUser: number;

  @Column({
    type: DataType.STRING(300),
    allowNull: false,
    field: 'fullName',
  })
  fullName: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
    field: 'email',
  })
  email: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    field: 'password',
  })
  password: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: 'phone',
  })
  phone: string;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'userType',
  })
  userType: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: new Date(),
    field: 'createDate',
  })
  createDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: new Date(),
    field: 'lastLogin',
  })
  lastLogin: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'deleted',
  })
  deleted: boolean;

  @Column({
    type: DataType.STRING(5000),
    allowNull: false,
    field: 'description',
  })
  description: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
    field: 'active',
  })
  active: boolean;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    field: 'genre',
  })
  genre: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    /* defaultValue: sequelize.fn('current_timestamp'), */
    defaultValue: new Date(),
    field: 'birthDay',
  })
  birthDay: Date;

  @Column({
    type: DataType.STRING(1500),
    allowNull: false,
    field: 'direction',
  })
  direction: string;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    field: 'weight',
  })
  weight : number;
  
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
    field: 'height',
  })
  height : number;

  @HasMany(() => Patient, 'idUserPatient')
  monitors: Patient[];
  
  @HasOne(() => Patient, 'idMonitor')
  patient: Patient;

  @BeforeCreate
  public static async hashPassword(user: User) {
    // Generate a salt and use it to hash the user's password
    if(user.password.length != 0){
      user.password = await bcrypt.hash(user.password, bcrypt.genSaltSync(10));
    }
    //a partir de aqui se hacen las acciones posteriores
  }

  public async validPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  public async hashNewPassword(newPassword: string) {
    // Generate a salt and use it to hash the user's password
    return await bcrypt.hash(newPassword, bcrypt.genSaltSync(10));
    //a partir de aqui se hacen las acciones posteriores
  }

  public async generatePassword() {
    // Start. Create Automatic Password 
    var length = 8;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }

    return retVal;
}
}
