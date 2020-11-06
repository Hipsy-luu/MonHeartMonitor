import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
// import { USER_REPOSITORY } from '../utils/constants';
//Normalmente se usa para formatear el objeto que recibimos en el request
import { ServerMessages } from '../../utils/serverMessages.util';
import { User } from '../../models/users.entity';
import { NewUserPassword } from './dto/newUserPassword.dto';
import { Op } from 'sequelize';
import { UserModelClass } from '../../classes/userModel.class';
import { UpdatedUser } from './dto/updatedUser.dto';
import { MailCenterService } from '../mail-center/mail-center.service';
import { Patient } from '../../models/patients.entity';

@Injectable()
export class UserService {
  constructor(
    private mailCenterService: MailCenterService,
    //Es una manera de dar de alta el repositorio de la tabla de usuarios
    @Inject('UserRepository') private readonly userRepository: typeof User,
    @Inject('PatientRepository') private readonly patientRepository: typeof Patient,

  ) { }

  /* async consultaEjemplo() {
    let response: any = {};
    try {
      response.newband = await this.bandRepository.findAll<Band>({
        attributes: ['band_id', 'name', 'photo', 'base_price', 'reviews', 'score'],
        where: { active: 1 },
        order: [
          ['created_at', 'DESC'],
        ],
        limit: 10,
        include: [{
          model: State,
          attributes: [['name', 'name']],
        }, {
          model: Town,
          attributes: [['name', 'name']],
        }, {
          model: BandSlider,
          attributes: [['url', 'url']],
          limit: 1
        }],
      }).map((band: any) => {
        return Object.assign(
          {
            band_id: band.band_id,
            name: band.name,
            photo: (new String(JSON.stringify(band.sliders[0])))
              .substring(8, new String(
                JSON.stringify(band.sliders[0])).length - 2),
            base_price: band.base_price,
            reviews: band.reviews,
            score: band.score,
            town_name: band.town.name,
            state_name: band.state.name
          })
      });
      return response;
    } catch (error) {
      return error;
    }
  } */

  /* async testUserWithBand(bandId : string) {
    return await this.userRepository.findOne<User>({include: [Band] ,where: {username: bandId}});
    //return await this.bandRepository.findOne<Band>({include: [User] ,where: {band_id: bandId}});
  }
  
  async findOneByEmail(useremail : string): Promise<User> {
    return await this.userRepository.findOne<User>({where: {email: useremail}});
  } */

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      attributes: { exclude: ['password', 'deleted'] },
      where: { email: email, deleted: false },
    });
  }

  async createUser(newUserData: any): Promise<ServerMessages> {
    if (
      newUserData.password == null ||
      newUserData.password == undefined ||
      newUserData.newUser == null ||
      newUserData.newUser == undefined ||
      newUserData.newUser.fullName == null ||
      newUserData.newUser.fullName == undefined ||
      newUserData.newUser.email == null ||
      newUserData.newUser.email == undefined ||
      newUserData.newUser.phone == null ||
      newUserData.newUser.phone == undefined ||
      newUserData.newUser.userType == null ||
      newUserData.newUser.userType == undefined ||
      newUserData.newUser.createDate == null ||
      newUserData.newUser.createDate == undefined ||
      newUserData.newUser.lastLogin == null ||
      newUserData.newUser.lastLogin == undefined ||
      newUserData.newUser.deleted == null ||
      newUserData.newUser.deleted == undefined ||
      newUserData.newUser.description == null ||
      newUserData.newUser.description == undefined ||
      newUserData.newUser.active == null ||
      newUserData.newUser.active == undefined ||
      newUserData.newUser.genre == null ||
      newUserData.newUser.genre == undefined ||
      newUserData.newUser.birthDay == null ||
      newUserData.newUser.birthDay == undefined ||
      newUserData.newUser.direction == null ||
      newUserData.newUser.direction == undefined ||
      newUserData.newUser.weight == null ||
      newUserData.newUser.weight == undefined ||
      newUserData.newUser.height == null ||
      newUserData.newUser.height == undefined
    ) {
      return new ServerMessages(true, 'Petición incompleta', {});
    }

    //Email validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(newUserData.newUser.email).toLowerCase())) {
      return new ServerMessages(true, 'Correo electrónico invalido.', {});
    }

    //Con esto se evitan incidencias en los nombres
    newUserData.newUser.email = newUserData.newUser.email.toLowerCase();

    var userEmail = await this.userRepository.findOne<User>({
      /* attributes: ['email'], */
      where: {
        email: newUserData.newUser.email,
        deleted: false
      },
    });

    if (userEmail) {
      return new ServerMessages(true, 'Correo actualmente registrado', {});
    } else {
      try {
        var newUser: User = await this.userRepository.create<User>({
          fullName: newUserData.newUser.fullName,
          email: newUserData.newUser.email,
          phone: newUserData.newUser.phone,
          password: newUserData.password,
          userType: newUserData.newUser.userType,
          createDate: newUserData.newUser.createDate,
          lastLogin: newUserData.newUser.lastLogin,
          deleted: newUserData.newUser.deleted,
          description: newUserData.newUser.description,
          active: newUserData.newUser.active,
          genre: newUserData.newUser.genre,
          birthDay: newUserData.newUser.birthDay,
          direction: newUserData.newUser.direction,
          weight: newUserData.newUser.weight,
          height: newUserData.newUser.height,
        }, {});

        return new ServerMessages(false, 'Usuario creado con éxito', newUser);

        /* let resultEmail = await this.mailCenterService.sendWelcomeEmail(newUser.fullName,newUser.email,newUserData.password);

        if (resultEmail.error == true) {
          return new ServerMessages(false, 'Usuario creado con éxito, la contraseña no se pudo enviar al correo', resultEmail);
        } else {
          return new ServerMessages(false, 'Usuario creado con éxito se a enviado la contraseña al correo indicado', newUser);
        } */
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    }
  }

  async updateUser(updatedUser: User): Promise<ServerMessages> {
    if (
      updatedUser.idUser == null ||
      updatedUser.idUser == undefined ||
      updatedUser.fullName == null ||
      updatedUser.fullName == undefined ||
      updatedUser.email == null ||
      updatedUser.email == undefined ||
      updatedUser.phone == null ||
      updatedUser.phone == undefined ||
      updatedUser.userType == null ||
      updatedUser.userType == undefined ||
      updatedUser.createDate == null ||
      updatedUser.createDate == undefined ||
      updatedUser.lastLogin == null ||
      updatedUser.lastLogin == undefined ||
      updatedUser.deleted == null ||
      updatedUser.deleted == undefined ||
      updatedUser.description == null ||
      updatedUser.description == undefined ||
      updatedUser.active == null ||
      updatedUser.active == undefined ||
      updatedUser.genre == null ||
      updatedUser.genre == undefined ||
      updatedUser.birthDay == null ||
      updatedUser.birthDay == undefined ||
      updatedUser.direction == null ||
      updatedUser.direction == undefined ||
      updatedUser.weight == null ||
      updatedUser.weight == undefined ||
      updatedUser.height == null ||
      updatedUser.height == undefined
    ) {
      return new ServerMessages(true, 'Petición incompleta', {});
    }

    //Email validation
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(updatedUser.email).toLowerCase())) {
      return new ServerMessages(true, 'Correo electrónico invalido.', {});
    }

    //Con esto se evitan incidencias en los nombres
    updatedUser.email = updatedUser.email.toLowerCase();

    var userEmail = await this.userRepository.findOne<User>({
      /* attributes: ['email'], */
      where: {
        idUser: {
          [Op.not]: updatedUser.idUser
        },
        email: updatedUser.email,
        deleted: false
      },
    });

    if (userEmail) {
      return new ServerMessages(true, 'Correo actualmente registrado', {});
    } else {
      try {
        var userForUpdate = await this.userRepository.findOne<User>({
          /* attributes: ['email'], */
          where: {
            idUser: updatedUser.idUser,
            deleted: false
          },
        });


        userForUpdate.fullName = updatedUser.fullName;
        userForUpdate.email = updatedUser.email;
        userForUpdate.phone = updatedUser.phone;
        userForUpdate.userType = updatedUser.userType;
        userForUpdate.createDate = updatedUser.createDate;
        userForUpdate.lastLogin = updatedUser.lastLogin;
        userForUpdate.deleted = updatedUser.deleted;
        userForUpdate.description = updatedUser.description;
        userForUpdate.active = updatedUser.active;
        userForUpdate.genre = updatedUser.genre;
        userForUpdate.birthDay = updatedUser.birthDay;
        userForUpdate.direction = updatedUser.direction;
        userForUpdate.weight = updatedUser.weight;
        userForUpdate.height = updatedUser.height;

        await userForUpdate.save();


        return new ServerMessages(false, 'Usuario actualizado con éxito', userForUpdate);

        /* let resultEmail = await this.mailCenterService.sendWelcomeEmail(newUser.fullName,newUser.email,newUserData.password);

        if (resultEmail.error == true) {
          return new ServerMessages(false, 'Usuario creado con éxito, la contraseña no se pudo enviar al correo', resultEmail);
        } else {
          return new ServerMessages(false, 'Usuario creado con éxito se a enviado la contraseña al correo indicado', newUser);
        } */
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error actualizando el usuario', error);
      }
    }
  }

  async getPatientByCode(idPatient: string): Promise<ServerMessages> {
      try {
        if (
          idPatient == undefined ||
          idPatient == null ||
          idPatient == "" 
        ) {
          return new ServerMessages(true, 'Petición incompleta', {});
        }
    
        var userOfCode: User = await this.userRepository.findOne<User>({
          where: { 
            idUser: idPatient , 
            deleted : false,
            userType : 1
          },
        });
    
        if (!userOfCode) {
          return new ServerMessages(true, 'El paciente no esta disponible', {});
        }

        return new ServerMessages(false, 'Paciente obtenido con éxito con éxito', userOfCode);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    }

    async setUserPatientToMonitor(idPatient: string, idMonitor: string): Promise<ServerMessages> {
      try {
        if (
          idMonitor == undefined ||
          idMonitor == null ||
          idMonitor == "" ||
          idPatient == undefined ||
          idPatient == null ||
          idPatient == "" 
        ) {
          return new ServerMessages(true, 'Petición incompleta', {});
        }
    
        var patientOfMonitor: Patient = await this.patientRepository.findOne<Patient>({
          where: { 
            idMonitor: idMonitor , 
            /* idUserPatient : idPatient */
          },
        });
        
        //si no tiene hay que crearla pero si la encuentra la edita
        if (!patientOfMonitor) {
          var newPatient: Patient = await this.patientRepository.create<Patient>({
            idMonitor: idMonitor , 
            idUserPatient : idPatient
          }, {});
  
          return new ServerMessages(false, 'Paciente guardado con éxito, primer uso', newPatient);
        }else{
          patientOfMonitor.idMonitor = idMonitor;
          patientOfMonitor.idUserPatient = idPatient;

          await patientOfMonitor.save();
          return new ServerMessages(false, 'Paciente guardado con éxito', patientOfMonitor);
        }
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    }


    //TO DO
    /* async updateUserPassword(
      idUser,
      newUserPassword: NewUserPassword,
    ): Promise<ServerMessages> {
      //console.log(newUserPassword);
  
      if (!newUserPassword.idUser || !idUser || !newUserPassword.newPassword) {
        return new ServerMessages(true, 'Petición incompleta', {});
      } else if (newUserPassword.newPassword.length < 8) {
        return new ServerMessages(true, 'La contraseña del usuario debe contener al menos 8 caracteres.', {});
      }
  
      let user = await this.userRepository.findOne<User>({
        where: { idUser: idUser, deleted: false },
      });
  
      try {
        user.password = await user.hashNewPassword(newUserPassword.newPassword);
        await user.save();
  
        let resultEmail = await this.mailCenterService.sendChangePasswordEmail(user.name+" "+user.surnames,user.email,newUserPassword.newPassword);
  
        if (resultEmail.error == true) {
          return new ServerMessages(false, 'Contraseña actualizada con éxito, la contraseña no se pudo enviar al correo', resultEmail);
        } else {
          return new ServerMessages(false, 'Contraseña actualizada con éxito se a enviado la contraseña al correo indicado', {});
        }
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    } */
    //TO DO
    /* async deleteUser(idUser: string): Promise<ServerMessages> {
      if (
        idUser == undefined ||
        idUser == null ||
        idUser == "" 
      ) {
        return new ServerMessages(true, 'Petición incompleta', {});
      }
  
      var userToUpdate: User = await this.userRepository.findOne<User>({
        where: { idUser: idUser , deleted : false},
      });
  
      if (!userToUpdate) {
        return new ServerMessages(true, 'El usuario no esta disponible', userToUpdate);
      }
  
      try {
        userToUpdate.deleted =  true;
        userToUpdate.save();
        return new ServerMessages(false, 'Usuario borrado con éxito', userToUpdate);
      } catch (error) {
        return new ServerMessages(true, 'A ocurrido un error', error);
      }
    } */
    //TO DO
    /* async getAllUsers(emailUser : string): Promise<ServerMessages> {
      try {
        var userList = await this.userRepository.findAll<User>({
          attributes: { exclude: ['password','deleted'] },
          where : { 
            deleted : false ,  
            email : { 
              [Op.not] : emailUser
            } 
          }
        });
        return new ServerMessages(false, 'Lista de usuarios obtenida', userList);
      } catch (error) {
        return new ServerMessages(true, 'Error obteniendo lista de usuarios', {});
      }
    } */


  }
