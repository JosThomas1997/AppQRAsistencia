 "# AppSistenciaQR" 
const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        title: "Error!",
        text: "Error en las credenciales, intentelo nuevamente!",
        icon: "error",
      });

Swal.fire({
        title: "Error!",
        text: "Error en las credenciales, intentelo nuevamente!",
        icon: "error",
        confirmButtonText: "OK",
        heightAuto: false
      });



      async editarUser(email: string) {
    const usuario = this.usuariosServices.getUsuarioByEmail(email);

    const alert = await this.alertCtrl.create({
      header: 'Editar Usuario',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: usuario?.name,
          placeholder: 'Nombre'
        },
        {
          name: 'email',
          type: 'text',
          value: usuario?.email,
          placeholder: 'Correo electrónico'
        },
        {
          name: 'pass',
          type: 'password',
          value: usuario?.pass,
          placeholder: 'Contraseña'
        },
        {
          name: 'tipo',
          type: 'text',
          value: usuario?.tipo,
          placeholder: 'Tipo de usuario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const updatedUsuario: Usuario = {
              email: data.email,
              pass: data.pass,
              tipo: data.tipo,
              name: data.name
            };
            this.usuariosServices.updateUsuario(email, updatedUsuario);
            this.config();  
          }
        }
      ]
    });

    await alert.present();
  }