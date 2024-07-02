import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBonEntreeComponent } from './detail-bon-entree.component';

describe('DetailBonEntreeComponent', () => {
  let component: DetailBonEntreeComponent;
  let fixture: ComponentFixture<DetailBonEntreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBonEntreeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBonEntreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
