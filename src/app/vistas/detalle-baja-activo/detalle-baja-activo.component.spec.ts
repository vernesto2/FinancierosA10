import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleBajaActivoComponent } from './detalle-baja-activo.component';

describe('DetalleBajaActivoComponent', () => {
  let component: DetalleBajaActivoComponent;
  let fixture: ComponentFixture<DetalleBajaActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleBajaActivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleBajaActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
