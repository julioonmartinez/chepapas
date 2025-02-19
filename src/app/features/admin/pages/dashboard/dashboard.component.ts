import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { PapasDialogComponent } from '../../components/dialogs/papas-dialog/papas-dialog.component';
import { Chepapas } from '../../../../shared/interfaces/chepapas';
import { ChepapasService } from '../../../../core/services/chepapas.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  dialogPapas = inject(MatDialog);

  chepapasService = inject(ChepapasService);

  chepapas = signal<Chepapas[]>([])
  ngOnInit(): void {
    this.chepapasService.getAllPapas().subscribe()
    this.chepapasService.chePapas$.subscribe(papas=>{
      this.chepapas.set(papas)
      console.log(papas)
    })
  }

  openDialog(papas?:Chepapas){
    this.dialogPapas.open(PapasDialogComponent, {
      data: papas
    }).afterClosed().subscribe(result=>{
      console.log('result', result)
    })
  }

}
