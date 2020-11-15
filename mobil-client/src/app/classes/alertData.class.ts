export class AlertData {
    type: number;
    message: string;
    created: Date;

    constructor(ty: number, mess: string) {
        this.type = ty;
        this.message = mess;
        this.created = new Date();
    }
}