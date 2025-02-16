import { Component, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PapasService } from '../../../core/services/papas.service';
import { Papas } from '../../interfaces/papas';
import { ChepapasService } from '../../../core/services/chepapas.service';
import { Chepapas } from '../../interfaces/chepapas';

@Component({
  selector: 'app-tinder-card',
  imports: [
    CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
        MatSnackBarModule
  ],
  templateUrl: './tinder-card.component.html',
  styleUrl: './tinder-card.component.scss',
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
export class TinderCardComponent {


  
    chePapasList = signal<Chepapas[] | null>(null);
    superShotsLeft = 3;
    currentRating: 'like' | 'dislike' | 'supershot' | 'stars' | null = null;
    animationState: 'normal' | 'flipped' | 'swiped' = 'normal';
    startSelected: number = 3;
    isAnimating = false;
  buttonStates: { [key: string]: 'normal' | 'pressed' } = {
    like: 'normal',
    dislike: 'normal',
    supershot: 'normal'
  };
   ratindMode = input<'tinder' | 'star'> ('tinder');

   defaultImage = "https://pinaenlacocina.com/wp-content/uploads/2019/11/IMG_0742-680x907.jpg";

   currentIndex:number = 0;
   currenPapas = signal<Chepapas | null>(null);
  chePapasService = inject(ChepapasService)
  constructor(){
    this.chePapasService.getAllPapas().subscribe({
      next:(response)=>{
        console.log(response)
      }
    }) ;
    this.chePapasService.chePapas$.subscribe({
      next:(papasList)=>{
        this.chePapasList.set(papasList);
       if(papasList.length > 0){
        this.currentIndex = 0;
        this.currenPapas.set(papasList[0]);
       }
       
        
      },
      error:(err)=>{
        console.error(err)
      }
    })
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
    
    }

   

    // Animate card flip
    setTimeout(() => {
      this.animationState = 'flipped';
      
      // Change coffee and reset states
      setTimeout(() => {

        this.currentIndex = (this.chePapasList()!.length - 1) > this.currentIndex ? this.currentIndex + 1 :  0;
        this.currenPapas.set(this.chePapasList()![this.currentIndex]);
        this.currentRating = null;
        this.isAnimating = false;
        this.animationState = 'normal';
        this.buttonStates[rating] = 'normal';

      }, 500);
    }, 1000);
  }

  ratingStar(star:number){
    this.startSelected = star;
    this.isAnimating = true;
    this.currentRating = 'stars'
    setTimeout(() => {
      this.animationState = 'flipped';
      
      // Change coffee and reset states
      setTimeout(() => {
        this.currentIndex = (this.chePapasList()!.length - 1) > this.currentIndex ? this.currentIndex + 1 :  0;
        this.currenPapas.set(this.chePapasList()![this.currentIndex]);
        this.currentRating = null;
        this.isAnimating = false;
        this.animationState = 'normal';
        this.startSelected = 3;

      }, 500);
    }, 1000);
  }



  getRatingStampClass(): string {
    switch (this.currentRating) {
      case 'like': return 'stamp-like';
      case 'dislike': return 'stamp-dislike';
      case 'supershot': return 'stamp-supershot';
      case 'stars': return 'stamp-stars';
      default: return '';
    }
  }

  getRatingStampText(): string {
    switch (this.currentRating) {
      case 'like': return '¡ME ENCANTA! 😍';
      case 'dislike': return 'PASO 😒' ;
      case 'supershot': return '¡SUPER PAPA! ⚡️';
      case 'stars' : return this.startSelected + ` ✨`.repeat(this.startSelected);
      default: return '';
    }
  }

  getButtonState(button: string): 'normal' | 'pressed' {
    return this.buttonStates[button];
  }

  

  


  }
