import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.css']
})
export class AgregarModalComponent{
  // Define el formulario para el usuario y el detalle
  formularioUsuario: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;

  get passwordInput() { return this.formularioUsuario.get('password'); }  ;
  formularioDetalle: FormGroup;


 constructor(
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<AgregarModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any // Agregamos la inyección de datos del modal
) {
  // Inicializa los formularios en el constructor
  this.formularioUsuario = this.formBuilder.group({
    // Define los campos para el formulario de usuario
    // ...
  });

  this.formularioDetalle = this.formBuilder.group({
    // Define los campos para el formulario de detalle
    // ...
  });

  if (data.esEdicion) {
    // Si es una edición, configura los formularios con los datos del usuario recibidos
    this.formularioUsuario.patchValue(data.usuario);
    // ... Configura el formularioDetalle si es necesario
  }
}


  ngOnInit(): void {
    // No es necesario agregar nada aquí, los formularios ya fueron inicializados en el constructor
  }

  guardarRegistro(): void {
    if (this.formularioUsuario.valid && this.formularioDetalle.valid) {
      const nuevoUsuario = this.formularioUsuario.value;
      const nuevoDetalle = this.formularioDetalle.value;

      // Aquí puedes guardar los datos del nuevo usuario y detalle en tu base de datos o donde sea necesario
      // Por ejemplo, podrías emitir los objetos nuevoUsuario y nuevoDetalle para que el componente padre los reciba y los agregue a la tabla.
      this.dialogRef.close({ usuario: nuevoUsuario, detalle: nuevoDetalle });
    }
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
