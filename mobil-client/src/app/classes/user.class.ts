//import { SafeUrl } from '@angular/platform-browser';

export class User {
    idUser: number;

    //all users
    fullName: string;
    email: string;
    phone: string;
    userType: number;  //0 = monitor, 1 = paciente
    createDate: Date;
    lastLogin: Date;
    deleted: boolean;
    description: string;

    //user monitor
    patient: User;

    //user paciente
    active: boolean;
    genre: number;
    birthDay: Date;
    direction: string;
    weight : number;
    height : number;

    monitors: User[];

    constructor() {
        this.idUser = -1;

        //all users
        this.fullName = "";
        this.email = "";
        this.phone = "";
        this.userType = -1;  //0 = monitor, 1 = paciente
        this.createDate = new Date();
        this.lastLogin = new Date();
        this.deleted = false;
        this.description = "";

        //user monitor
        //this.patient = new User();

        //user paciente
        this.active = false;
        this.genre = 1; //0 = mujer 1 = hombre
        this.birthDay = new Date();
        this.direction = "";
        this.weight = 0;
        this.height = 0;

        this.monitors = [];
    }
}