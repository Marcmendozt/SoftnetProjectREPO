import { Component, OnInit,ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AgregarModalComponent } from './agregar-modal/agregar-modal.component';

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
  INT_FLG_ELIMINADO: number;
  selected: boolean;
}

interface Users {
  coD_USUARIO: number;
  tI_DOCUMENTO: string;
  vaR_DOC_IDENTIDAD: string;
  vaR_APELLIDOS: string;
  vaR_NOMBRES: string;
  vaR_PASSWORD: string;
  vaR_NUM_TELEFONO: string;
  feC_REGISTRO: Date;
  feC_MODIFICACION: Date;
  inT_FLG_ELIMINADO: number;

}

interface DetalleUsuarioEmpresa{
    coD_EMPRESA: number;
    coD_USUARIO: number;
    vaR_CARGO: string;
    vaR_CORREO: string;
    inT_ESTADO: number;
    vaR_NOM_IMAGEN: string;
    feC_REGISTRO: Date;
    feC_MODIFICACION: Date;
    inT_FLG_ELIMINADO: number;
}

interface UsuarioConDetalle {
  usuario: Users; 
  detalle: DetalleUsuarioEmpresa; 
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  @ViewChild(AgregarModalComponent) agregarModalComponent!: AgregarModalComponent;

  @ViewChild('modalFormUsuario') modalFormUsers: any;
  @ViewChild('modalFormDetalle') modalFormDetails: any;

  usuarioSeleccionado: Usuario | null = null;
  public titulo: string = '';
  usuarios: Usuario[] = []; 
 
  columnas: string[] = [ '*','coD_USUARIO', 
  'tI_DOCUMENTO', 'vaR_DOC_IDENTIDAD',
   'vaR_APELLIDOS', 'vaR_NOMBRES', 'vaR_PASSWORD', 
   'vaR_NUM_TELEFONO','vaR_CARGO','vaR_CORREO',
    'feC_REGISTRO', 'feC_MODIFICACION',
     'inT_FLG_ELIMINADO', 'acciones'];
  public selectedRowIndex : number = -1;
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  ngOnInit() {

    this.obtenerDatosDeAPI();
   
  }


  obtenerDatosDeAPI() {
    this.http.get<Usuario[]>('https://localhost:44348/api/SF/ListUserDet').subscribe(
      (data) => {
        this.usuarios = data.map((usuario) => ({ ...usuario, selected: false }));
        console.log('DATA', data);
      },
      (error) => {
        console.error('Error al obtener los datos de la API:', error);
      }
    );
  }

  AccionModal(esEdicion: boolean = false): void {
  

    const dialogRef = this.dialog.open(AgregarModalComponent, {
      width: '950px',
      data: { esEdicion } 
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result != null) {
      
        const nuevoUsuario: Users = {
          coD_USUARIO: 0,
          tI_DOCUMENTO: result.usuario.tI_DOCUMENTO,
          vaR_DOC_IDENTIDAD: result.usuario.vaR_DOC_IDENTIDAD,
          vaR_APELLIDOS: result.usuario.vaR_APELLIDOS,
          vaR_NOMBRES: result.usuario.vaR_NOMBRES,
          vaR_PASSWORD: result.usuario.vaR_PASSWORD,
          vaR_NUM_TELEFONO: result.usuario.vaR_NUM_TELEFONO,
          feC_REGISTRO: new Date(),
          feC_MODIFICACION: new Date(),
          inT_FLG_ELIMINADO: 1
        };
  
        const nuevoDetalle: DetalleUsuarioEmpresa = {
          coD_EMPRESA : 0,
          coD_USUARIO : 0,
          vaR_CARGO: result.detalle.vaR_CARGO,
          vaR_CORREO: result.detalle.vaR_CORREO,
          inT_ESTADO: 1,
          vaR_NOM_IMAGEN: 'foto.png',
          feC_REGISTRO: new Date(),
          feC_MODIFICACION: new Date(),
          inT_FLG_ELIMINADO: 1
        };
  
          const usuarioConDetalle: UsuarioConDetalle = {
            usuario: nuevoUsuario,
            detalle: nuevoDetalle,
          };
            


          this.http.post<any>('https://localhost:44348/api/SF/AgregarUsuarioConDetalle', usuarioConDetalle)
            .subscribe(
              (response) => {
                this.obtenerDatosDeAPI();
                console.log('Usuario agregado con éxito:', response);
              },
              (error) => {
                console.error('Error al agregar usuario:', error);
              }
            );
        }
    });
  }
  

  
 
  toggleSelection(usuario: Usuario) {
    this.usuarios.forEach(u => u.selected = u === usuario);
  }



  


  modificarUsuario(usuario: Usuario) {
   
    this.usuarioSeleccionado = usuario;
  
    
    const dialogRef = this.dialog.open(AgregarModalComponent, {
      width: '950px',
      data: { esEdicion: true, usuario: usuario}
    });
  
    dialogRef.afterClosed().subscribe(result => {

      if (result != null) {
       
        const nuevoUsuario: Users = result.usuario;
        const nuevoDetalle: DetalleUsuarioEmpresa = result.detalle;
  
        const usuarioConDetalle: UsuarioConDetalle = {
          usuario: nuevoUsuario,
          detalle: nuevoDetalle,
        };
  
   
        this.http.post<any>('https://localhost:44348/api/SF/AgregarUsuarioConDetalle', usuarioConDetalle)
          .subscribe(
            (response) => {
              console.log('Usuario agregado con éxito:', response);
              this.obtenerDatosDeAPI();
            },
            (error) => {
              console.error('Error al agregar usuario:', error);
            }
          );
      }
    });
  }
  
 

  eliminarUsuario(usuario: Users) {



    if (usuario.coD_USUARIO) {
      const confirmarEliminacion = confirm('¿Estás seguro de eliminar este registro?');
      if (confirmarEliminacion) {
        this.http.delete(`https://localhost:44348/api/SF/${usuario.coD_USUARIO}`).subscribe(
          () => {
           
            this.obtenerDatosDeAPI();
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
          }
        );
      }
    } else {
      console.error('El usuario no tiene un ID válido (COD_USUARIO)');
    }
  }
  
  
  


  
  actualizarUsuario(datosUsuario: any) {
   
    this.obtenerDatosDeAPI();
  }

}

