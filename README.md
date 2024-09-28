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