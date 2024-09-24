import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from '../../../components/loading/loading.component';
import { NavbarComponent } from '../../../components/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoadingComponent, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  showPassword: boolean = false;
  errMsgEmail!:string;
  errorStates = { email: false, pass: false };
  errMsg!:string;
  ngEmail!:string;
  ngPass!:string;
  errMsgPass!:string;
  @Input() redirect:boolean = true;
  @Output() register = new EventEmitter<any>();

  userImg:any = []

  isLoading:boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private router:Router) {
}

  ngOnInit(): void {
    this.authService.logOut(this.redirect);
  }

  //?Login with firebase
  authService = inject(AuthService);

  async onSubmit(formData: any) {
    this.errorStates = { email: false, pass: false };
    this.errMsgEmail = "";
    this.errMsg = "";
    this.errMsgPass = "";

    if (formData) {
        this.isLoading = true;
        try {
            await this.authService.signIn(formData).then( resp => {
              this.isLoading = false;
              console.log(resp);
              
              // Verifica si el correo electrónico está verificado
              
              if (resp) {
                  this.router.navigateByUrl("/admin-panel");
              } else {
                  // Si el correo no está verificado, muestra un mensaje de error
                  this.errMsg = "El correo electrónico no está verificado. Por favor, verifica tu correo electrónico.";
                  this.errorStates.email = true;
                  this.errorStates.pass = false; // Resetea el estado del error de contraseña
              }
            }); // Inicia sesión y obtiene el usuario
            
        } catch (err:any) {
            this.isLoading = false;
            console.log(err);
            switch (err.code) {
                case "auth/invalid-email":
                    this.errMsgEmail = "Ingrese un correo electrónico válido.";
                    this.errorStates.email = true;
                    break;
                case "auth/invalid-credential":
                    this.errMsg = "Correo y/o contraseña incorrecta.";
                    this.errorStates.email = true;
                    this.errorStates.pass = true;
                    break;
                case "auth/missing-email":
                    this.errMsgEmail = "Ingrese el correo electrónico.";
                    this.errorStates.email = true;
                    this.errMsgPass = "Ingrese la contraseña";
                    this.errorStates.pass = true;
                    break;
                default:
                    this.errMsgEmail = "El correo electrónico no está verificado.";
                    this.errorStates.email = true;
                    break;
            }
        }
    }
}


  esperarYRedirigir(storage:string, detalle:any, url:string, intervalo:number = 50) {
    const idIntervalo = setInterval(() => {
        sessionStorage.setItem(storage, detalle);
        if (sessionStorage.getItem(storage) == detalle) {
            clearInterval(idIntervalo);
            this.router.navigateByUrl(url);
        }
    }, intervalo);
  }
}
