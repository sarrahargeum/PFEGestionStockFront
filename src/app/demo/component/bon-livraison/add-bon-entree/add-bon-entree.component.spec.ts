import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBonEntreeComponent } from './add-bon-entree.component';

describe('AddBonEntreeComponent', () => {
  let component: AddBonEntreeComponent;
  let fixture: ComponentFixture<AddBonEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBonEntreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBonEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
