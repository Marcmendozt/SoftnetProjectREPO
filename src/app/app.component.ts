import { Component, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AgregarModalComponent } from './agregar-modal/agregar-modal.component'; // Asegúrate de proporcionar la ruta correcta a tu componente modal

interface Usuario {
  COD_USUARIO: number;
  TI_DOCUMENTO: string;
  VAR_DOC_IDENTIDAD: string;
  VAR_APELLIDOS: string;
  VAR_NOMBRES: string;
  VAR_PASSWORD: string;
  VAR_NUM_TELEFONO: string;
  FEC_REGISTRO: Date;
  FEC_MODIFICACION: Date;
  INT_FLG_ELIMINADO: boolean;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  usuarios: any[] = []; // Variable para almacenar los datos de la API
  columnas: string[] = ['coD_USUARIO', 'tI_DOCUMENTO', 'vaR_DOC_IDENTIDAD', 'vaR_APELLIDOS', 'vaR_NOMBRES', 'vaR_PASSWORD', 'vaR_NUM_TELEFONO', 'feC_REGISTRO', 'feC_MODIFICACION', 'inT_FLG_ELIMINADO', 'acciones'];

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {
    // Aquí puedes llamar a una función para obtener los datos de la API y luego listarlos en la tabla
    this.obtenerDatosDeAPI();
  }


  obtenerDatosDeAPI() {
    // Realiza la solicitud HTTP para obtener los datos de la API
    this.http.get<any[]>('https://localhost:44348/api/SF/Listado-usuarios')
      .subscribe(data => {
        // Los datos de la API se almacenan en la variable usuarios
        this.usuarios = data;
        console.log('DATA',data)
      }, error => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }

  openModal(esEdicion: boolean = false): void {
    const dialogRef = this.dialog.open(AgregarModalComponent, {
      width: '950px',
      data: { esEdicion } // Pasamos el indicador si es edición o no al componente del modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes realizar acciones después de que se cierre el modal, si es necesario
    });
  }
  
  selectedRowIndex: number = -1;




  toggleSelection(index: number) {
    if (this.selectedRowIndex === index) {
      this.selectedRowIndex = -1;
    } else {
      this.selectedRowIndex = index;
    }
  }

  
  

  agregarUsuario() {
    // Aquí podrías abrir el modal para agregar un nuevo usuario y, al recibir los datos del modal, enviarlos a la API para crear un nuevo registro
    this.openModal();
  }

  modificarUsuario(usuario: Usuario): void {
    // Aquí abrimos el modal en modo edición y cargamos los datos del usuario en el formulario
    const dialogRef = this.dialog.open(AgregarModalComponent, {
      width: '950px',
      data: { esEdicion: true, usuario: usuario } // Pasamos el indicador esEdicion y el usuario seleccionado al componente del modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Aquí puedes realizar acciones después de que se cierre el modal de edición, si es necesario
    });
  }
  
  eliminarUsuario(usuario: Usuario) {
    // Aquí podrías enviar una solicitud a la API para eliminar el usuario seleccionado
    // Luego, podrías actualizar la tabla llamando nuevamente a la función obtenerDatosDeAPI() para refrescar los datos después de eliminar el usuario
    this.http.delete(`https://localhost:44348/api/SF/Listado-usuarios/${usuario.COD_USUARIO}`)
      .subscribe(() => {
        this.obtenerDatosDeAPI();
      }, error => {
        console.error('Error al eliminar el usuario:', error);
      });
  }




  // Función para enviar los datos del formulario del modal a la API para actualizar un usuario
  actualizarUsuario(datosUsuario: any) {
    // Aquí deberías enviar una solicitud PUT o PATCH a la API con los datos del usuario a actualizar
    // Por ejemplo: this.http.put(`https://localhost:44348/api/SF/Listado-usuarios/${datosUsuario.COD_USUARIO}`, datosUsuario)
    // Luego, puedes actualizar la tabla llamando nuevamente a la función obtenerDatosDeAPI() para refrescar los datos después de modificar el usuario
    this.obtenerDatosDeAPI();
  }

}

