import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistaEmpregoComponent } from './entrevista-emprego.component';

describe('EntrevEmpreComponent', () => {
  let component: EntrevistaEmpregoComponent;
  let fixture: ComponentFixture<EntrevistaEmpregoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntrevistaEmpregoComponent]
    });
    fixture = TestBed.createComponent(EntrevistaEmpregoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
