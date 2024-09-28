import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { AuthService } from 'src/app/services/firebase/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passreco',
  templateUrl: './passreco.page.html',
  styleUrls: ['./passreco.page.scss'],
})
export class PassrecoPage implements OnInit {

  resetForm: FormGroup;
  email: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private alertController: AlertController, // Inyecta AlertController
    private authService : AuthService
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {}

  async recoveryPassword() {
    
    try {
      let timerInterval: any; 
      this.authService.recoveryPassword(this.email);
      Swal.fire({
        title: "Procesando",
        html: "Envianos un correo",
        timer: 2000,
        timerProgressBar: true,
        heightAuto: false,
        didOpen: () => {
          Swal.showLoading(null);
          const timer = Swal.getPopup()!.querySelector("b")!;
          timerInterval = setInterval(() => {
            timer!.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          Swal.fire({
            title: "Éxito!",
            text: "Correo enviado correctamente!",
            icon: "success",
            confirmButtonText: "OK",
            heightAuto: false
          });
    }
});
    } catch (error) {
      
    }

   
  }
}
