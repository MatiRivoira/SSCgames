export class Juego {
    nombre:string;
    img:string;
    correo:string;
    contraseña:string;
    plataforma:string;
    correoAux:any;
    contraseñaAux:any;

    constructor(nombre:string, img:string, correo:string, contraseña:string, plataforma:string, correoAux?:string, contraseñaAux?:string) {
        this.nombre = nombre;
        this.img = img;
        this.correo = correo;
        this.contraseña = contraseña;
        this.plataforma = plataforma;

        this.correoAux = correoAux;
        this.contraseñaAux = contraseñaAux;
    }
}