import { ServerMessages } from './../../utils/serverMessages.util';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../models/users.entity';
import * as fs from 'fs';
/* import { Direction } from '../../models/directions.entity'; */

@Injectable()
export class UploadsService {
    constructor(
        //Es una manera de dar de alta el repositorio de la tabla de usuarios
        @Inject('UserRepository') private readonly userRepository: typeof User,
        /* @Inject('DirectionRepository') private readonly directionRepository: typeof Direction, */
    ) { }

    /* async setBrandHaveImage(imageName: string) : Promise<any> {
        let idBrand = imageName.substr(0,imageName.indexOf(".jpg"));
        try {
            // Change haveImage to true to the user
            let bandForUpdated : Brand =  await this.brandRepository.findOne<Brand>({
                where: {
                    idBrand: idBrand,
                    deleted : false
                }
            });

            if(bandForUpdated == null){
                return new ServerMessages(true , "Error seteando imagen de la marca, la marca no existe",{});
            }
            bandForUpdated.haveImage = true;
            await bandForUpdated.save();
            
            return new ServerMessages(false , "Se subió correctamente la imagen de la marca "+ bandForUpdated.idBrand,bandForUpdated);
        } catch (error) {
            return new ServerMessages(true , "Error seteando imagen de la marca",error);
        }
    } */

    /* async deleteImageBrand(idBrand: string) : Promise<any> {
        return new Promise(async (resolve,reject)=>{
            fs.unlink('storage/brands/'+idBrand+'.jpg' , async (error) => {
                if (error) {
                    resolve( new ServerMessages(true,"Imagen no existe.",{}) );
                }else{
                    try {
                        // Change haveImage to true to the user
                        let brandForUpdated : Brand =  await this.brandRepository.findOne<Brand>({
                            where: {
                                idBrand: idBrand,
                                deleted : false
                            }
                        });
            
                        if(brandForUpdated == null){
                            resolve( new ServerMessages(true , "Error seteando imagen de la marca, la marca no esta disponible",{}) );
                        }
                        brandForUpdated.haveImage = false;
                        let brand = await brandForUpdated.save();
                        
                        resolve( new ServerMessages(false , "Se elimino correctamente la imagen de la marca "+ brand.idBrand,brand) );
                    } catch (error) {
                        resolve( new ServerMessages(true , "Error seteando imagen de la marca",error) );
                    }
                };
            });
        })
        
    } */

}
