import { Injectable, UnauthorizedException, Inject, ValidationError } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/loginUser.dto';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwtPayload.interface';

import { ServerMessages } from './../../utils/serverMessages.util';
import { User } from '../../models/users.entity';
import { Patient } from '../../models/patients.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @Inject('UserRepository') private readonly userRepository: typeof User,
    @Inject('PatientRepository') private readonly patientRepository: typeof Patient,
  ) { }

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      !loginAttempt.password ||
      !loginAttempt.email
    ) {
      return new ServerMessages(true, 'Petición incompleta', {});
    } else if (loginAttempt.password.length < 8) {
      return new ServerMessages(
        true,
        'La contraseña debe contener al menos 8 caracteres.',
        {},
      );
    } else if (!re.test(String(loginAttempt.email).toLowerCase())) {
      return new ServerMessages(
        true,
        'Email invalido.',
        {},
      );
    }
    // This will be used for the initial login whit email
    let userToAttempt: User = await this.userRepository.findOne<User>({
      /* attributes: { exclude: ['password','deleted'] }, */
      where: { email: loginAttempt.email, deleted: false },
      /*include: [{
        model: Patient,
        as : "monitors"
      },{
        model: Patient,
        as : "patient"
      }], */
    });
    //ds
    return new Promise(async (resolve, reject) => {
      let response: any;
      if (userToAttempt == null) {
        resolve(
          new ServerMessages(true, 'Usuario y/ó contraseña inválidos', {}),
        );
      } else {
        // Check the supplied password against the hash stored for this email
        let checPass = await userToAttempt.validPassword(loginAttempt.password);
        if (checPass) {
          userToAttempt.patient = await this.patientRepository.findOne<Patient>({
            where: {
              idMonitor: userToAttempt.idUser,
              // idUserPatient : idPatient 
            },
          });
          // If there is a successful match, generate a JWT for the user
          response = this.createJwtPayload(userToAttempt.email);


          // If there is a successful match, generate a JWT for the user
          //let token = this.createJwtPayload(user.email);
          //return  new ServerMessages(false , "Inicio Exitoso", response ) ;
          let patient = await this.patientRepository.findOne<Patient>({
            where: {
              idMonitor: userToAttempt.idUser,
              // idUserPatient : idPatient 
            },
            include: [{
              model: User,
              as: "patientData"
            }],
          });

         let monitors: Patient[] = await this.patientRepository.findAll<Patient>({
            where: {
              // idMonitor: userToAttempt.idUser, 
              idUserPatient: userToAttempt.idUser
            },
            include: [{
              model: User,
              as: "monitor"
            }],
          }).map((monitor: Patient) => {
            return Object.assign(
              {
                idUser: monitor.monitor.idUser,
                fullName: monitor.monitor.fullName,
                email: monitor.monitor.email,
                phone: monitor.monitor.phone,
                // password:  monitor.monitor.password, 
                userType: monitor.monitor.userType,
                createDate: monitor.monitor.createDate,
                lastLogin: monitor.monitor.lastLogin,
                deleted: monitor.monitor.deleted,
                description: monitor.monitor.description,
                active: monitor.monitor.active,
                genre: monitor.monitor.genre,
                birthDay: monitor.monitor.birthDay,
                direction: monitor.monitor.direction,
                weight: monitor.monitor.weight,
                height: monitor.monitor.height,
              })
          });


          
          response.user = {
            idUser: userToAttempt.idUser,
            fullName: userToAttempt.fullName,
            email: userToAttempt.email,
            phone: userToAttempt.phone,
            /* password: userToAttempt.password, */
            userType: userToAttempt.userType,
            createDate: userToAttempt.createDate,
            lastLogin: userToAttempt.lastLogin,
            deleted: userToAttempt.deleted,
            description: userToAttempt.description,
            active: userToAttempt.active,
            genre: userToAttempt.genre,
            birthDay: userToAttempt.birthDay,
            direction: userToAttempt.direction,
            weight: userToAttempt.weight,
            height: userToAttempt.height,

            patient: patient != null ? patient.patientData : null,
            monitors: monitors
          };;
          //Save the last login
          userToAttempt.lastLogin = new Date();

          resolve(new ServerMessages(false, 'Inicio Exitoso', response));
        } else {
          resolve(
            new ServerMessages(
              true,
              'Usuario y/ó contraseña inválidos',
              new UnauthorizedException(),
            ),
          );
        }
      }
    });
  }

  //Esta funcion nos ayuda a crear el middleware donde vamos a sacar el usuario segun los token que lleguen
  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    let userToAttempt: User = await this.userRepository.findOne<User>({
      /* attributes: { exclude: ['password','deleted'] }, */
      where: { 
        email: payload.email, 
        deleted: false 
      },
      include: [{
        model: Patient,
        as : "monitors",
        include: [{
          model: User,
          as: "monitor"
        }],
      },{
        model: Patient,
        as : "patient",
        include: [{
          model: User,
          as: "patientData"
        }],
      }],
    });

    

    if (userToAttempt) {
      // If there is a successful match, generate a JWT for the user
      //let token = this.createJwtPayload(user.email);
      //return  new ServerMessages(false , "Inicio Exitoso", response ) ;
      let patient = await this.patientRepository.findOne<Patient>({
        where: {
          idMonitor: userToAttempt.idUser,
          // idUserPatient : idPatient 
        },
        include: [{
          model: User,
          as: "patientData"
        }],
      });

      let monitors: Patient[] = await this.patientRepository.findAll<Patient>({
        where: {
          // idMonitor: userToAttempt.idUser, 
          idUserPatient: userToAttempt.idUser
        },
        include: [{
          model: User,
          as: "monitor"
        }],
      }).map((monitor: Patient) => {
        return Object.assign(
          {
            idUser: monitor.monitor.idUser,
            fullName: monitor.monitor.fullName,
            email: monitor.monitor.email,
            phone: monitor.monitor.phone,
            userType: monitor.monitor.userType,
            createDate: monitor.monitor.createDate,
            lastLogin: monitor.monitor.lastLogin,
            deleted: monitor.monitor.deleted,
            description: monitor.monitor.description,
            active: monitor.monitor.active,
            genre: monitor.monitor.genre,
            birthDay: monitor.monitor.birthDay,
            direction: monitor.monitor.direction,
            weight: monitor.monitor.weight,
            height: monitor.monitor.height,
          })
      });


      return {
        idUser: userToAttempt.idUser,
        fullName: userToAttempt.fullName,
        email: userToAttempt.email,
        phone: userToAttempt.phone,
        userType: userToAttempt.userType,
        createDate: userToAttempt.createDate,
        lastLogin: userToAttempt.lastLogin,
        deleted: userToAttempt.deleted,
        description: userToAttempt.description,
        active: userToAttempt.active,
        genre: userToAttempt.genre,
        birthDay: userToAttempt.birthDay,
        direction: userToAttempt.direction,
        weight: userToAttempt.weight,
        height: userToAttempt.height,

        patient: patient != null ? patient.patientData : null,
        monitors: monitors
      };
    } else {
      throw new UnauthorizedException();
    }
  }

  createJwtPayload(email) {
    let data: JwtPayload = {
      email: email,
    };
    let jwt = this.jwtService.sign(data);
    return {
      expiresIn: 60 * 60 * 24 * 365, //Token de un año de vida para evitar guardar datos personales en los dispositivos
      token: jwt,
    };
  }
}
