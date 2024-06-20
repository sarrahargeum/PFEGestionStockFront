import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmagasinComponent } from './listmagasin.component';

describe('ListmagasinComponent', () => {
  let component: ListmagasinComponent;
  let fixture: ComponentFixture<ListmagasinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListmagasinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListmagasinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
