import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.css']
})
export class AgregarModalComponent implements OnInit {
  public formularioUsuario: FormGroup;
  public formularioDetalle: FormGroup;
  public editarTitulo: string = '';

  hide = true;
  get passwordInput() { return this.formularioUsuario.get('password'); }  ;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AgregarModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formularioUsuario = this.formBuilder.group({
      coD_USUARIO: [data.esEdicion && data.usuario ? data.usuario.coD_USUARIO : '', Validators.required],
      tI_DOCUMENTO: [data.esEdicion && data.usuario ? data.usuario.tI_DOCUMENTO : '', Validators.required],
      vaR_DOC_IDENTIDAD: [data.esEdicion && data.usuario ? data.usuario.vaR_DOC_IDENTIDAD : '', Validators.required],
      vaR_APELLIDOS: [data.esEdicion && data.usuario ? data.usuario.vaR_APELLIDOS : '', Validators.required],
      vaR_NOMBRES: [data.esEdicion && data.usuario ? data.usuario.vaR_NOMBRES : '', Validators.required],
      vaR_PASSWORD: [data.esEdicion && data.usuario ? data.usuario.vaR_PASSWORD : '', Validators.required],
      vaR_NUM_TELEFONO: [data.esEdicion && data.usuario ? data.usuario.vaR_NUM_TELEFONO : '', Validators.required],
   
    });

    this.formularioDetalle = this.formBuilder.group({
      
      vaR_CARGO: [data.esEdicion && data.usuario ? data.usuario.vaR_CARGO : '', Validators.required],
      vaR_CORREO: [data.esEdicion && data.usuario ? data.usuario.vaR_CORREO : '', Validators.required],
    });

    if (data.esEdicion) {
      this.editarTitulo = 'Editar Usuario';
      console.log('DATA USUARIO',data.usuario);
      this.formularioUsuario.patchValue(data.usuario);
     this.formularioDetalle.patchValue(data.detalle);
     
    } else {
      this.editarTitulo = 'Agregar nuevo Usuario';
    }
  }

  ngOnInit(): void {}

  AccionAGRMOD(): void {
    const esEdicion = this.data.esEdicion || false;
  
   
      const nuevoUsuario = this.formularioUsuario.value;
      const nuevoDetalle = this.formularioDetalle.value;
  
      if (esEdicion) {
        
        this.dialogRef.close({ usuario: nuevoUsuario, detalle: nuevoDetalle });
      } else {
        //Nuevo
        this.dialogRef.close({ usuario: nuevoUsuario, detalle: nuevoDetalle });
      }
  
    
    
  }
  

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
