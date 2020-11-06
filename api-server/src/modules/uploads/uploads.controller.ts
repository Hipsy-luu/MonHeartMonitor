import { Controller, Post, UseInterceptors, UploadedFiles, Body, Param, Get, Res, UseGuards} from '@nestjs/common';
import {  FilesInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as multer from 'multer';
import * as fs from 'fs';
import { ServerMessages } from '../../utils/serverMessages.util';
import { AuthGuard } from '@nestjs/passport';
import { UploadsService } from './uploads.service';

var brandsPath = './storage/brands/';
var songsPath = './storage/songs/';

const jpgFileFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);

    if(ext !== '.jpg'){
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    }
    return callback(null, true);
}

//Reasigna los valores para guardar la imagen (carpeta y si no existe la crea)
var storageBrand = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log({stringActual : dirCompany , stringdirectorio : dir});
        if (!fs.existsSync('./storage/') ){
            fs.mkdirSync('./storage/');
        }
        if (!fs.existsSync(brandsPath) ){
            fs.mkdirSync(brandsPath);
        }
        cb(null, brandsPath)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname );
    }
});

//Reasigna los valores para guardar la imagen de las canciones segun el nombre del archivo(carpeta y si no existe la crea)
var storageSongs = multer.diskStorage({
    destination: function (req, file, cb) {
        var dirSong = file.originalname.toString().slice(0,file.originalname.toString().indexOf("-"));
        var dir = songsPath+dirSong+'/';
        //console.log({stringActual : dirSong , stringdirectorio : dir});
        if (!fs.existsSync(songsPath)){
            fs.mkdirSync(songsPath);
        }
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        //Desde el nombre ya deberia de venir como se guardara la imagen (piano,guitar o bass)
        let name : String = file.originalname.toString().slice(
            file.originalname.toString().indexOf("-")+1,file.originalname.toString().lengt );
        //console.log("nombre del archivo de la cancion " + name);
        cb( null, name);
    }
});

@Controller('uploads')
export class UploadsController {
    constructor(private uploadsService : UploadsService){}
    //////////////////////////////////////USUARIOS/////////////////////////////////////////////////
    //Crea y guarda la imagen del usuario y su directorio
    /* @Post('brand-image/')
    @UseGuards(AuthGuard())
    @UseInterceptors(FilesInterceptor('files[]', 1, {
        fileFilter: jpgFileFilter,
        storage: storageBrand
    }))
    async userImageFileUpload(@UploadedFiles() images): Promise<any> {
        return await this.uploadsService.setBrandHaveImage(images[0].originalname);
    } */

    //URL que proporciona las imagenes de los usuarios 
    /* @Get('brand-image/:idBrand') */
    /* @UseGuards(AuthGuard()) */
    /* async serveUserImage(@Param('idBrand') idBrand : String, @Res() res): Promise<any> {
        try {
            res.sendFile( idBrand+'.jpg' , { root: 'storage/brands/'}, 
            (err) => {
                if (err) {
                    return new ServerMessages(true,"Imagen de la marca "+ idBrand+" no encontrada.",err);
                } else {
                    return new ServerMessages(false,"Imagen de la marca " + idBrand + " enviada.",{});
                }
            }
            );
        } catch (error) {
            return new ServerMessages(true,"Imagen de la marca "+ idBrand +" no encontrada.",error);
        }
        
    } */
    //Elimina la imagen de un usuario
    /* @Get('brand-delete-image/:idBrand')
    @UseGuards(AuthGuard())
    async deleteBrandImage(@Param('idBrand') idBrand : string): Promise<any> {
        return await this.uploadsService.deleteImageBrand(idBrand );
    } */
}
