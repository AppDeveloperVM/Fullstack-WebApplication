import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTarjetaCreditoComponent } from './list-tarjeta-credito.component';

describe('ListTarjetaCreditoComponent', () => {
  let component: ListTarjetaCreditoComponent;
  let fixture: ComponentFixture<ListTarjetaCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTarjetaCreditoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTarjetaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
