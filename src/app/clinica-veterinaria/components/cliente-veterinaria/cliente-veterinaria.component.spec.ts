import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteVeterinariaComponent } from './cliente-veterinaria.component';

describe('AnimalComponent', () => {
  let component: ClienteVeterinariaComponent;
  let fixture: ComponentFixture<ClienteVeterinariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteVeterinariaComponent]
    });
    fixture = TestBed.createComponent(ClienteVeterinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
