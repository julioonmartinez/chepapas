import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderCardComponent } from './tinder-card.component';

describe('TinderCardComponent', () => {
  let component: TinderCardComponent;
  let fixture: ComponentFixture<TinderCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinderCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
