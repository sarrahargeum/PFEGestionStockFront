import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmagasinComponent } from './editmagasin.component';

describe('EditmagasinComponent', () => {
  let component: EditmagasinComponent;
  let fixture: ComponentFixture<EditmagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditmagasinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditmagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
