import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMagasinComponent } from './gestion-magasin.component';

describe('GestionMagasinComponent', () => {
  let component: GestionMagasinComponent;
  let fixture: ComponentFixture<GestionMagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMagasinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionMagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
