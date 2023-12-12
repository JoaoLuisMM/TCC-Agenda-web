import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicaMedicaComponent } from './clinica-medica.component';

describe('ClinicaMedicaComponent', () => {
  let component: ClinicaMedicaComponent;
  let fixture: ComponentFixture<ClinicaMedicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClinicaMedicaComponent]
    });
    fixture = TestBed.createComponent(ClinicaMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
