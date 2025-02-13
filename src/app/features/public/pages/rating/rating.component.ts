import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Papas } from '../../../../shared/interfaces/papas';
import { PapasService } from '../../../../core/services/papas.service';

@Component({
  selector: 'app-rating',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  animations: [
    trigger('coffeeState', [
      state('normal', style({
        transform: 'rotateY(0)',
        opacity: 1
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)',
        opacity: 0
      })),
      transition('normal <=> flipped', animate('500ms ease-in-out'))
    ]),
    trigger('buttonPress', [
      state('pressed', style({
        transform: 'scale(0.9)'
      })),
      state('normal', style({
        transform: 'scale(1)'
      })),
      transition('normal <=> pressed', animate('100ms ease-in-out'))
    ]),
    trigger('stampAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0) rotate(12deg)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1) rotate(12deg)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0) rotate(12deg)' }))
      ])
    ])
  ]
})
export class RatingComponent {

  private coffeeService = inject(PapasService);
  private snackBar = inject(MatSnackBar);

  currentCoffee: Papas = this.coffeeService.getFirstPapas();
  superShotsLeft = 3;
  currentRating: 'like' | 'dislike' | 'supershot' | null = null;
  animationState: 'normal' | 'flipped' | 'swiped' = 'normal';
  isAnimating = false;
  buttonStates: { [key: string]: 'normal' | 'pressed' } = {
    like: 'normal',
    dislike: 'normal',
    supershot: 'normal'
  };

  puestos = [
    {
      id: 1,
      nombre: "Doña Mary",
      ubicacion: "Portal Hidalgo",
      horario: "3pm - 10pm",
      especialidad: "Papas con chorizo",
      imagen: "https://pinaenlacocina.com/wp-content/uploads/2019/11/IMG_0742-680x907.jpg",
      popularidad: 98,
      espera: "5-10 min"
    },
    {
      id: 2,
      nombre: "Las Tradicionales",
      ubicacion: "Plaza Principal",
      horario: "4pm - 11pm",
      especialidad: "Papas con chamoy",
      imagen: "https://www.cardamomo.news/__export/1683742761077/sites/debate/img/2023/05/10/papas_zamoranas.png_172596871.png",
      popularidad: 95,
      espera: "15-20 min"
    }
  ];

  currentIndex = 0;
  get currentPuesto() {
    return this.puestos[this.currentIndex];
  }

  rateCoffee(rating: 'like' | 'dislike' | 'supershot') {
    if (rating === 'supershot' && this.superShotsLeft === 0) {
      return;
    }

    this.buttonStates[rating] = 'pressed';
    this.currentRating = rating;
    this.isAnimating = true;

    if (rating === 'supershot') {
      this.superShotsLeft--;
       // Show rating message
    this.showRatingMessage(rating);
    }

   

    // Animate card flip
    setTimeout(() => {
      this.animationState = 'flipped';
      
      // Change coffee and reset states
      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.puestos.length;
        this.currentRating = null;
        this.isAnimating = false;
        this.animationState = 'normal';
        this.buttonStates[rating] = 'normal';

      }, 500);
    }, 1000);
  }


  getRatingStampClass(): string {
    switch (this.currentRating) {
      case 'like': return 'stamp-like';
      case 'dislike': return 'stamp-dislike';
      case 'supershot': return 'stamp-supershot';
      default: return '';
    }
  }

  getRatingStampText(): string {
    switch (this.currentRating) {
      case 'like': return '¡ME ENCANTA!';
      case 'dislike': return 'PASO';
      case 'supershot': return '¡SUPER SHOT! ⚡️';
      default: return '';
    }
  }

  private showRatingMessage(rating: 'like' | 'dislike' | 'supershot') {
    const messages = {
      like: '¡Este café va directo a favoritos! ☕️✨',
      dislike: '¡A buscar un mejor café! 🔍',
      supershot: '¡INCREÍBLE! ⚡️☕️✨'
    };

    this.snackBar.open(messages[rating], 'Cerrar', {
      duration: 3000,
      panelClass: [`snackbar-${rating}`]
    });
  }

  ratePuesto(rating: 'like' | 'dislike' | 'supershot') {
    if (rating === 'supershot' && this.superShotsLeft === 0) return;

    this.buttonStates[rating] = 'pressed';
    this.animationState = 'swiped';

    if (rating === 'supershot') {
      this.superShotsLeft--;
    }

    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.puestos.length;
      this.animationState = 'normal';
      this.buttonStates[rating] = 'normal';
    }, 300);
  }

  getButtonState(button: string): 'normal' | 'pressed' {
    return this.buttonStates[button];
  }

}
