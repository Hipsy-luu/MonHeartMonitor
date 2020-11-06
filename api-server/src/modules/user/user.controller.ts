import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../models/users.entity';
import { AuthGuard } from '@nestjs/passport';
import { ServerMessages } from '../../utils/serverMessages.util';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* @Get('user-list')
  @UseGuards(AuthGuard())
  public async getUsers( @Request() req): Promise<ServerMessages> {
    return this.userService.getAllUsers(req.user.email);
  } */

  @Post('create-user')
  /* @UseGuards(AuthGuard()) */
  public async createUser(@Body() newUser): Promise<ServerMessages> {
    return this.userService.createUser(newUser);
  }

  @Post('update-user')
  @UseGuards(AuthGuard())
  public async updateUser(@Body() body): Promise<ServerMessages> {
    return this.userService.updateUser(body);
  }

  @Get('get-user-patient/:idPatient')
  @UseGuards(AuthGuard())
  public async getPatientByCode(@Param('idPatient') idPatient : string): Promise<ServerMessages> {
    return this.userService.getPatientByCode(idPatient);
  }

  @Get('set-user-patient/:idPatient')
  @UseGuards(AuthGuard())
  public async setUserPatientToMonitor(@Request() req , @Param('idPatient') idPatient : string): Promise<ServerMessages> {
    return this.userService.setUserPatientToMonitor(idPatient, req.user.idUser );
  }

//TO DO
  /* @Post('change-user-pass')
  @UseGuards(AuthGuard())
  public async updateUserPassword(@Request() req ,@Body() body ): Promise<ServerMessages> {
    return this.userService.updateUserPassword(req.user.idUser , body);
  } */

  /* @Post('testuserband')
  testUserWithBand( @Body() body : any){
    return this.userService.testUserWithBand(body.bandId);
  } */
  // This route will require successfully passing our default auth strategy (JWT) in order
  // to access the route
  /* @Get('testheader')
  @UseGuards(AuthGuard())
  testAuthRoute( @Request() req ){
    let user = req.user;

    return ServerMessages.messageResponse(false , "Acceso a ruta protegida correctamente", { user : user }); 
  } */
}
