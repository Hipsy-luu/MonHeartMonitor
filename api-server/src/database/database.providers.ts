import { Sequelize } from 'sequelize-typescript';

/**
 * SEQUELIZE variable is stored in a file named
 * 'constants' so it can be easily reused anywhere
 * without being subject to human error.
 */
//import { SEQUELIZE } from '../utils/constants';
import { User } from '../models/users.entity';
import { Patient } from '../models/patients.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeInstance',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        define: {
          timestamps: false,
        },
        logging: false,
        host: 'localhost',
        port: 3306,
        username: 'last_proy_user',
        password: '5cATIDA39Q3hwDo0',
        database: 'last_proy',
      });

      /**
       * Add Models Here
       * ===============
       * You can add the models to
       * Sequelize later on.
       */
      sequelize.addModels([
        User,
        Patient
      ]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
