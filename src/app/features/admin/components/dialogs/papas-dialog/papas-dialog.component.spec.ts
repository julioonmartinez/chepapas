import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapasDialogComponent } from './papas-dialog.component';

describe('PapasDialogComponent', () => {
  let component: PapasDialogComponent;
  let fixture: ComponentFixture<PapasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PapasDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PapasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
