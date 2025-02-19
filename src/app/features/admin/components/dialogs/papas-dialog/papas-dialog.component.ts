import { Component, inject, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { Chepapas } from '../../../../../shared/interfaces/chepapas';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChepapasService } from '../../../../../core/services/chepapas.service';

@Component({
  selector: 'app-papas-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSelectModule,
    MatChipsModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './papas-dialog.component.html',
  styleUrl: './papas-dialog.component.scss'
})
export class PapasDialogComponent {

  readonly dialogRef = inject(MatDialogRef<PapasDialogComponent>)
  data = inject<Chepapas>(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  chepapasForm: FormGroup;
  chepapasService = inject(ChepapasService);
  constructor(
   
    
  ) {
    if (this.data) {
      this.chepapasForm = this.fb.group({
        active:[this.data.active],
        displayName: [this.data.displayName, [Validators.required, Validators.minLength(3)]],
        formattedAddress: [this.data.formattedAddress, Validators.required],
        location: this.fb.group({
          latitude: [this.data.location.latitude, [Validators.required]],
          longitude: [this.data.location.longitude, [Validators.required]]
        }),
        hours: [this.data.hours, Validators.required],
        description: [this.data.description, [ Validators.maxLength(300)]],
        salsas: this.fb.array(this.data.salsas ? this.data.salsas.map(salsa => this.createSalsaFormGroup(salsa)) : []),
        categorias: this.fb.array(this.data.categorias ? this.data.categorias.map(categoria => this.createCategoriaFormGroup(categoria)) : [])
      });
    } else {
      this.chepapasForm = this.fb.group({
        active:[true],
        displayName: ['', [Validators.required, Validators.minLength(3)]],
        formattedAddress: ['', Validators.required],
        location: this.fb.group({
          latitude: [null, [Validators.required]],
          longitude: [null, [Validators.required]]
        }),
        hours: ['', Validators.required],
        description: ['', [ Validators.maxLength(300)]],
        salsas: this.fb.array([]),
        categorias: this.fb.array([])
      });
    }
  }

  // Métodos auxiliares para crear los FormGroup de cada elemento
createSalsaFormGroup(salsa?: any): FormGroup {
  return this.fb.group({
    name: [salsa?.name || '', Validators.required],
    picor: [salsa?.picor || 1, [Validators.required, Validators.min(1), Validators.max(3)]]
  });
}

createCategoriaFormGroup(categoria?: any): FormGroup {
  return this.fb.group({
    icon: [categoria?.icon || '', Validators.required],
    name: [categoria?.name || '', Validators.required]
  });
}

  get salsas(): FormArray<FormGroup> {
    return this.chepapasForm.get('salsas') as FormArray<FormGroup>;
  }

  get categorias(): FormArray<FormGroup> {
    return this.chepapasForm.get('categorias') as FormArray<FormGroup>;
  }
  

  addSalsa() {
    this.salsas.push(this.fb.group({
      name: ['', Validators.required],
      picor: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    }));
  }

  removeSalsa(index: number) {
    this.salsas.removeAt(index);
  }

  addCategoria() {
    this.categorias.push(this.fb.group({
      icon: ['', Validators.required],
      name: ['', Validators.required]
    }));
  }

  removeCategoria(index: number) {
    this.categorias.removeAt(index);
  }

  submit() {
    if (this.chepapasForm.invalid) return; 
    
    const papasData: Chepapas = {
      ...this.chepapasForm.value, 
      displayName: this.chepapasForm.value.displayName.trim(),
      formattedAddress: this.chepapasForm.value.formattedAddress.trim(),
      description: this.chepapasForm.value.description.trim(),
    };
  
    if (this.data?._id) {
      // Actualizar
      this.chepapasService.updatePapas(this.data._id, papasData).subscribe({
        next: () => {
          console.log("Papas actualizadas correctamente");
        },
        error: (err) => {
          console.error("Error al actualizar", err);
        }
      });
    } else {
      // Crear nuevo
      this.chepapasService.createPapas(papasData).subscribe({
        next: (response) => {
          console.log("Nueva papa creada:", response);
        },
        error: (err) => {
          console.error("Error al crear", err);
        }
      });
    }
  }
  

  close() {
    this.dialogRef.close();
  }

  deletePapas(){
    this.chepapasService.deletePapas(this.data._id).subscribe({
      next:(result)=>{
        this.dialogRef.close(true)
      },
      error:(err)=>{
        console.log('Parece hubo un error')
      }
    });
  }


  

}
