import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreamorComponent } from './depreamor.component';

describe('DepreamorComponent', () => {
  let component: DepreamorComponent;
  let fixture: ComponentFixture<DepreamorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepreamorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreamorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
